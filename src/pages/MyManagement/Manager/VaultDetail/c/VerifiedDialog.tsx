import { FC, useEffect, useState } from 'react'

import { useRequest } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'
import { useManageVaultVerifyList } from '@/hooks/useVaultList'

import { AddressType } from '@/types/base'
import { VaultVerifiedItemTypes } from '@/types/vault'

import { getVaultReviewed } from '@/api/vaultList'
import { CONTACT_US_URL } from '@/config'
import ALink from '@@/common/ALink'
// import FundFactory, { VaultVerifiedItemTypes } from '@/class/FundFactory'
import InfoDialog from '@@/common/Dialog/Info'

interface Props {
  vaultAddress: AddressType
  name: string
}

const FundDialog: FC<Props> = ({ vaultAddress, name }) => {
  const { account } = useProfile()
  const { updateVerifyList, setUpdateVerifyList } = useManageVaultVerifyList()
  const [dialogStatus, setDialogStatus] = useState<boolean[]>([])
  const [dialogData, setDialogData] = useState<VaultVerifiedItemTypes[]>([])

  const { loading, data } = useRequest(async () => getVaultReviewed(account ?? '0x', 1, name), {
    refreshDeps: [vaultAddress]
  })

  useEffect(() => {
    if (loading || !vaultAddress || !data) return
    const status: boolean[] = []
    const items: VaultVerifiedItemTypes[] = []
    data.forEach((item) => {
      if (
        vaultAddress.toLocaleLowerCase() === item.address.toLocaleLowerCase() &&
        !updateVerifyList.includes(item.hash)
      ) {
        status.push(status.length === 0 ? true : false)
        items.push(item)
      }
    })

    // console.log('data', data, status)
    setDialogStatus(status)
    setDialogData(items)
  }, [data, loading, vaultAddress])
  // console.log('dialogData', dialogData)
  const onDialogClose = (index: number) => {
    const status = [...dialogStatus]
    status[index] = false
    if (status[index + 1] === false) {
      status[index + 1] = true
    }
    setDialogStatus(status)
  }

  const onDialogConfirm = (index: number, address: string) => {
    onDialogClose(index)
    setUpdateVerifyList([...updateVerifyList, address], +new Date())
  }
  return (
    <>
      {dialogData.map((item, index) => (
        <InfoDialog
          show={dialogStatus[index]}
          key={index}
          onClose={() => onDialogClose(index)}
          onConfirm={() => onDialogConfirm(index, item.hash)}
          hideCancelButton
          type={item.result ? 'succ' : 'fail'}
          confirmText="OKAY, GOT IT"
          title={
            item.result ? (
              <>
                Well done! <br />
                Reset application was passed
              </>
            ) : (
              <>
                Oops! <br />
                Reset application was rejected
              </>
            )
          }
        >
          {item.result ? (
            <article>
              Your application for reset of the <strong>{item.data}</strong> vault has been approved
              and will take effect at the next Epoch
            </article>
          ) : (
            <article>
              Your application for reset of <strong>{item.data}</strong> vault has been rejected,
              please <ALink to={CONTACT_US_URL}>contact us</ALink> if you have any questions
            </article>
          )}
        </InfoDialog>
      ))}
    </>
  )
}

export default FundDialog
