import React, { FC, useState, useEffect } from 'react'
import { useRequest } from 'ahooks'

import { useManageFundVerifyList } from '@/hooks/useFund'
import { useProfile } from '@/hooks/useProfile'
import FundFactory, { FundVerifiedItemTypes } from '@/class/FundFactory'
import InfoDialog from '@@/common/Dialog/Info'
import ALink from '@@/common/ALink'

import { CONTACT_US_URL } from '@/config'

interface Props {
  fundAddress: string
  name: string
}

const FundDialog: FC<Props> = ({ fundAddress, name }) => {
  const { account } = useProfile()
  const { updateVerifyList, setUpdateVerifyList } = useManageFundVerifyList()
  const [dialogStatus, setDialogStatus] = useState<boolean[]>([])
  const [dialogData, setDialogData] = useState<FundVerifiedItemTypes[]>([])
  const { FundVerified } = FundFactory

  const { loading, data } = useRequest(async () => FundVerified(account, 1, name), {
    refreshDeps: [fundAddress]
  })

  useEffect(() => {
    if (loading || !fundAddress || !data) return
    const status: boolean[] = []
    const items: FundVerifiedItemTypes[] = []
    data.forEach((item) => {
      if (
        fundAddress.toLocaleLowerCase() === item.address.toLocaleLowerCase() &&
        !updateVerifyList.includes(item.hash)
      ) {
        status.push(status.length === 0 ? true : false)
        items.push(item)
      }
    })

    console.log('data', data, status)
    setDialogStatus(status)
    setDialogData(items)
  }, [data, loading, fundAddress])

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
              Your application for reset of the <strong>{item.data}</strong> fund has been approved
              and will take effect at the next Epoch
            </article>
          ) : (
            <article>
              Your application for reset of <strong>{item.data}</strong> fund has been rejected,
              please <ALink to={CONTACT_US_URL}>contact us</ALink> if you have any questions
            </article>
          )}
        </InfoDialog>
      ))}
    </>
  )
}

export default FundDialog
