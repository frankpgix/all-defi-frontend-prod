import { FC, useEffect, useMemo, useState } from 'react'

import BN from 'bignumber.js'

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
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInit, setisInit] = useState<boolean>(true)

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
  {
    /* (beginningAUM * underlyingPrice) / sum(beginningAUM * underlyingPrice)  start price */
  }

  const beginningValue = useMemo(
    () =>
      BN.sum(
        ...data.map((item) =>
          BN(item.detail.beginningAUM).times(item.underlyingbeginningPrice).toNumber()
        )
      ).toNumber(),
    [data]
  )
  const currentValue = useMemo(
    () =>
      BN.sum(
        ...data.map((item) => BN(item.detail.beginningAUM).times(item.underlyingPrice).toNumber())
      ).toNumber(),
    [data]
  )
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
            beginningValue={beginningValue}
            currentValue={currentValue}
            onChange={() => onActiveChange(index)}
            callback={callback}
          />
        ))}
      </div>
    </>
  )
}

export default FundDetails
