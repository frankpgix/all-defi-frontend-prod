import React, { FC, useState, useMemo, useEffect } from 'react'
import { useRequest } from 'ahooks'

import { useManageFundList, useManageFundVerifyList } from '@/hooks/useFund'
import { useProfile } from '@/hooks/useProfile'
import FundFactory, { FundVerifiedItemTypes } from '@/class/FundFactory'
import InfoDialog from '@@/common/Dialog/Info'
import ALink from '@@/common/ALink'
import { CONTACT_US_URL } from '@/config'

const FundDialog: FC = () => {
  const { account } = useProfile()
  const { manageFundList = [] } = useManageFundList()
  const { createVerifyList, setCreateVerifyList } = useManageFundVerifyList()
  const [dialogStatus, setDialogStatus] = useState<boolean[]>([])
  const [dialogData, setDialogData] = useState<FundVerifiedItemTypes[]>([])
  const fundAddressList = useMemo(
    () => manageFundList.map((item) => item.address.toLocaleLowerCase()),
    [manageFundList]
  )
  const { FundVerified } = FundFactory

  const { loading, data } = useRequest(async () => FundVerified(account, 0), {
    refreshDeps: [fundAddressList]
  })
  // console.log(data)
  useEffect(() => {
    if (loading || fundAddressList.length === 0 || !data) return
    const status: boolean[] = []
    const items: FundVerifiedItemTypes[] = []
    data.forEach((item) => {
      if (!createVerifyList.includes(item.address)) {
        status.push(status.length === 0 ? true : false)
        items.push(item)
      }
    })
    // console.log(data, status, items)
    setDialogStatus(status)
    setDialogData(items)
  }, [data, loading, fundAddressList, createVerifyList])

  console.log(dialogData, dialogStatus)
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
          onConfirm={() => onDialogConfirm(index, item.address)}
          hideCancelButton
        >
          {item.result ? (
            <article>
              Your application for the create of <strong>{item.data}</strong> fund has passed the
              review, and it is now displayed in the fund list
            </article>
          ) : (
            <article>
              Your application for the create of <strong>{item.data}</strong> fund has been
              rejected, please <ALink to={CONTACT_US_URL}>contact us</ALink> if you have any
              questions
            </article>
          )}
        </InfoDialog>
      ))}
    </>
  )
}

export default FundDialog
