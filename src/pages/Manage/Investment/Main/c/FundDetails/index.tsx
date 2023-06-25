import React, { FC, useState } from 'react'

import { FundUserListDataProps } from '@/hooks/help'

import { useStoreDerivativeList } from '@/store/useFunds'

import Button from '@@/common/Button'

import FundItem from './Item'

interface Props {
  data: FundUserListDataProps[]
  callback: () => void
}

const FundDetails: FC<Props> = ({ data, callback }) => {
  const derivativeList = useStoreDerivativeList((state: any) => state.derivativeList)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInit, setisInit] = useState<boolean>(true)

  const onActiveChange = (index: number) => {
    setActiveIndex(index)
    if (isInit) setisInit(false)
  }

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
            derivativeList={derivativeList}
          />
        ))}
      </div>
    </>
  )
}

export default FundDetails
