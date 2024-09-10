import { FC, useEffect, useState } from 'react'

// import { FundUserListDataProps } from '@/class/help'
// import FundPool from '@/class/FundPool'
// import AllProtocol from '@/class/AllProtocol'
// import { ProductProps } from '@/config/products'
// import { useProfile } from '@/hooks/useProfile'
// import { useCancelAllocate } from '@/hooks/useVault'
import { VaultUserListDataProps } from '@/types/vault'

import Cache from '@/utils/cache'
import HistoryButton from '@@/Vaults/TransactionHistoryButton'

// import { notify } from '@@/common/Toast'
import FundItem from './Item'

interface Props {
  data: VaultUserListDataProps[]
  callback: () => void
}

const FundDetails: FC<Props> = ({ data, callback }) => {
  // const { account } = useProfile()
  // const { createNotify, updateNotifyItem } = useNotify()

  // const { cancelRedeem, cancelSubscribe } = FundPool
  // const { getDerivativeList } = AllProtocol

  // const [derivativeList, setDerivativeList] = useState<ProductProps[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInit, setisInit] = useState<boolean>(true)

  // const onCancelRedeem = async (address: string) => {
  //   if (account && address) {
  // const notifyId = await createNotify({ type: 'loading', content: 'Cancel Withhold' })
  // const { status, msg, hash } = await cancelRedeem(address, signer)
  // if (status) {
  //   await callback(true)
  //   updateNotifyItem(notifyId, { type: 'success', hash })
  // } else {
  //   updateNotifyItem(notifyId, { type: 'error', title: 'Cancel Withhold', content: msg, hash })
  // }
  //   }
  // }

  // const onCancelSubscribe = async (address: string) => {
  //   if (account && address) {
  // const notifyId = await createNotify({ type: 'loading', content: 'Cancel Allocation' })
  // const { status, msg, hash } = await cancelSubscribe(address, signer)
  // if (status) {
  //   await callback(true)
  //   updateNotifyItem(notifyId, { type: 'success', hash })
  // } else {
  //   updateNotifyItem(notifyId, {
  //     type: 'error',
  //     title: 'Cancel Allocation',
  //     content: msg,
  //     hash
  //   })
  // }
  //   }
  // }

  const onActiveChange = (index: number) => {
    setActiveIndex(index)
    Cache.set('UserInvestmentViewIndex', index)
    if (isInit) setisInit(false)
  }

  useEffect(() => {
    const cacheIndex = Cache.get('UserInvestmentViewIndex')
    if (cacheIndex) {
      setActiveIndex(cacheIndex)
      setisInit(false)
    }
  }, [])

  return (
    <>
      <div className="web-manage-investment-fund">
        <h2>
          Vault Details <HistoryButton />
        </h2>
        {data.map((item, index) => (
          <FundItem
            key={index}
            active={activeIndex === index}
            isInit={isInit}
            fund={item}
            onChange={() => onActiveChange(index)}
            callback={callback}
          />
        ))}
      </div>
    </>
  )
}

export default FundDetails
