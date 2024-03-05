import { FC, useState, useMemo, useEffect } from 'react'
import { useRequest } from 'ahooks'

import { useManageVaultListHook, useManageVaultVerifyList } from '@/hooks/useVaultList'
import { useProfile } from '@/hooks/useProfile'
import InfoDialog from '@@/common/Dialog/Info'
import ALink from '@@/common/ALink'
import { CONTACT_US_URL } from '@/config'

import { VaultVerifiedItemTypes } from '@/types/vault'
import { getVaultReviewed } from '@/api/vaultList'

const VerifiedDialog: FC = () => {
  const { account } = useProfile()
  const { manageVaultList = [] } = useManageVaultListHook()
  const { createVerifyList, setCreateVerifyList } = useManageVaultVerifyList()
  const [dialogStatus, setDialogStatus] = useState<boolean[]>([])
  const [dialogData, setDialogData] = useState<VaultVerifiedItemTypes[]>([])
  const vaultAddressList = useMemo(
    () => manageVaultList.map((item) => item.address.toLocaleLowerCase()),
    [manageVaultList]
  )

  const { loading, data } = useRequest(async () => getVaultReviewed(account ?? '0x', 0), {
    refreshDeps: [vaultAddressList]
  })
  // console.log(data)
  useEffect(() => {
    if (loading || vaultAddressList.length === 0 || !data) return
    const status: boolean[] = []
    const items: VaultVerifiedItemTypes[] = []
    data.forEach((item) => {
      if (!createVerifyList.includes(item.hash)) {
        status.push(status.length === 0 ? true : false)
        items.push(item)
      }
    })
    setDialogStatus(status)
    setDialogData(items)
  }, [data, loading, vaultAddressList, createVerifyList])

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
    setCreateVerifyList([...createVerifyList, address], +new Date())
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
                Creation application was passed
              </>
            ) : (
              <>
                Oops! <br />
                Creation application was rejected
              </>
            )
          }
        >
          {item.result ? (
            <article>
              Your application for the create of <strong>{item.data}</strong> vault has passed the
              review, and it is now displayed in the vault list
            </article>
          ) : (
            <article>
              Your application for the create of <strong>{item.data}</strong> vault has been
              rejected, please <ALink to={CONTACT_US_URL}>contact us</ALink> if you have any
              questions
            </article>
          )}
        </InfoDialog>
      ))}
    </>
  )
}

export default VerifiedDialog
