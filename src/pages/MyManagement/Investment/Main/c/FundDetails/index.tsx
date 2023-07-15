import React, { FC, useState, useCallback, useEffect } from 'react'

import { FundUserListDataProps } from '@/class/help'
import FundPool from '@/class/FundPool'
import AllProtocol from '@/class/AllProtocol'
import { ProductProps } from '@/config/products'
import { useProfile } from '@/hooks/useProfile'

import { notify } from '@@/common/Toast'

import Button from '@@/common/Button'

import FundItem from './Item'

interface Props {
  data: FundUserListDataProps[]
  callback: (update: boolean) => void
}

const FundDetails: FC<Props> = ({ data, callback }) => {
  const { signer } = useProfile()

  const { cancelRedeem, cancelSubscribe } = FundPool
  const { getDerivativeList } = AllProtocol

  const [derivativeList, setDerivativeList] = useState<ProductProps[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInit, setisInit] = useState<boolean>(true)

  const onCancelRedeem = async (address: string) => {
    if (signer && address) {
      const notifyId = notify.loading()
      const { status, msg } = await cancelRedeem(address, signer)
      if (status) {
        await callback(true)
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  const onCancelSubscribe = async (address: string) => {
    if (signer && address) {
      const notifyId = notify.loading()
      const { status, msg } = await cancelSubscribe(address, signer)
      if (status) {
        await callback(true)
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  const onActiveChange = (index: number) => {
    setActiveIndex(index)
    if (isInit) setisInit(false)
  }

  const getData = useCallback(async () => {
    const res = await getDerivativeList()
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
