import React, { FC, useState, useMemo, useEffect } from 'react'
import { useRequest } from 'ahooks'

import { useManageFundList, useManageFundVerifyList } from '@/hooks/useFund'
import FundFactory, { FundVerifiedItemTypes } from '@/class/FundFactory'
import InfoDialog from '@@/common/Dialog/Info'
import ALink from '@@/common/ALink'

const FundDialog: FC = () => {
  const { manageFundList = [] } = useManageFundList()
  const { createVerifyList, setCreateVerifyList } = useManageFundVerifyList()
  const [dialogStatus, setDialogStatus] = useState<boolean[]>([])
  const [dialogData, setDialogData] = useState<FundVerifiedItemTypes[]>([])
  const fundAddressList = useMemo(
    () => manageFundList.map((item) => item.address.toLocaleLowerCase()),
    [manageFundList]
  )
  const { FundVerified } = FundFactory

  const { loading, data } = useRequest(async () => FundVerified(0), {
    refreshDeps: [fundAddressList]
  })

  useEffect(() => {
    if (loading || fundAddressList.length === 0 || !data) return
    const status: boolean[] = []
    const items: FundVerifiedItemTypes[] = []
    data.forEach((item) => {
      if (fundAddressList.includes(item.address) && !createVerifyList.includes(item.address)) {
        status.push(status.length === 0 ? true : false)
        items.push(item)
      }
    })
    setDialogStatus(status)
    setDialogData(items)
  }, [data, loading, fundAddressList, createVerifyList])

  // console.log(dialogData, dialogStatus)
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
              rejected, please <ALink to="">contact us</ALink> if you have any questions
            </article>
          )}
        </InfoDialog>
      ))}
    </>
  )
}

export default FundDialog
