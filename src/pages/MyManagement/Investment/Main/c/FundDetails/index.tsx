import React, { FC, useState, useCallback, useEffect } from 'react'

import { FundUserListDataProps } from '@/class/help'
import FundPool from '@/class/FundPool'
import AllProtocol from '@/class/AllProtocol'
import { ProductProps } from '@/config/products'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

// import { notify } from '@@/common/Toast'

import Button from '@@/common/Button'

import FundItem from './Item'

interface Props {
  data: FundUserListDataProps[]
  callback: (update: boolean) => void
}

const FundDetails: FC<Props> = ({ data, callback }) => {
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const { cancelRedeem, cancelSubscribe } = FundPool
  const { getDerivativeList } = AllProtocol

  const [derivativeList, setDerivativeList] = useState<ProductProps[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInit, setisInit] = useState<boolean>(true)

  const onCancelRedeem = async (address: string) => {
    if (signer && address) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Redeem' })
      const { status, msg, hash } = await cancelRedeem(address, signer)
      if (status) {
        await callback(true)
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Cancel Redeem', content: msg, hash })
      }
    }
  }

  const onCancelSubscribe = async (address: string) => {
    if (signer && address) {
      const notifyId = await createNotify({ type: 'loading', content: 'Cancel Subscribe' })
      const { status, msg, hash } = await cancelSubscribe(address, signer)
      if (status) {
        await callback(true)
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Cancel Subscribe', content: msg, hash })
      }
    }
  }

  const onActiveChange = (index: number) => {
    setActiveIndex(index)
    if (isInit) setisInit(false)
  }

  const getData = useCallback(async () => {
    const res = await getDerivativeList()
    console.log(res, 'getDerivativeList')
    if (res) setDerivativeList(res)
  }, [getDerivativeList])

  useEffect(() => void getData(), [getData])

  return (
    <>
      <div className="web-manage-investment-fund">
        <h2>
          Fund Details
          <Button text to="/manage/investment/history">
            view transaction history
          </Button>
        </h2>
        {data.map((item, index) => (
          <FundItem
            key={index}
            active={activeIndex === index}
            isInit={isInit}
            fund={item}
            onChange={() => onActiveChange(index)}
            callback={callback}
            onCancelRedeem={onCancelRedeem}
            onCancelSubscribe={onCancelSubscribe}
            derivativeList={derivativeList}
          />
        ))}
      </div>
    </>
  )
}

export default FundDetails
