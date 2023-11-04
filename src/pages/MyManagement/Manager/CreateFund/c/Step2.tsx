import React, { FC, useMemo, useState } from 'react'
import { without } from 'lodash'
import classNames from 'classnames'

import { baseTokenOptions, getTokenByAddress } from '@/config/tokens'
import { ProductProps } from '@/config/products'
import { Input, Select } from '@@/common/Form'

import BlueLineSection from '@@/web/BlueLineSection'
import { TokenIcon } from '@@/common/TokenUnit'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

export interface Step2ConfirmProps {
  addresss: ProductProps[]
  minAmount: number
  maxAmount: number
  baseTokenAddress: string
}

interface Props {
  onConfirm: (data: Step2ConfirmProps) => void
  onBack: () => void
  show: boolean
  derivativeList: ProductProps[]
}

const Step2: FC<Props> = ({ onConfirm, show, onBack, derivativeList }) => {
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [baseTokenAddress, setBaseTokenAddress] = useState(baseTokenOptions[0].value)
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])
  const onSelect = (index: number) => {
    if (selectIndex.includes(index)) {
      setSelectIndex(without(selectIndex, index))
    } else {
      setSelectIndex([...selectIndex, index])
    }
  }

  const onNext = () => {
    const selectList = selectIndex.map((index: number) => derivativeList[index])
    onConfirm({
      addresss: selectList,
      minAmount: Number(minAmount),
      maxAmount: Number(maxAmount),
      baseTokenAddress
    })
  }
  const minAmountNumber = useMemo(() => {
    const zero = [...new Array(baseToken.precision - 1)].map(() => '0').join('')
    return Number(`0.${zero}1`)
  }, [baseToken.precision])

  const minAmountError = useMemo(
    () => Number(minAmount) < minAmountNumber && minAmount !== '',
    [minAmount, minAmountNumber]
  )
  const maxAmountError = useMemo(
    () => Number(maxAmount) <= Number(minAmount) && maxAmount !== '',
    [minAmount, maxAmount]
  )
  const isDisabled = useMemo(
    () =>
      selectIndex.length === 0 ||
      !minAmount ||
      Number(minAmount) === 0 ||
      !maxAmount ||
      maxAmountError ||
      minAmountError,
    [selectIndex, minAmount, maxAmount, maxAmountError, minAmountError]
  )

  const onBaseTokenChange = (address: number | string) => setBaseTokenAddress(String(address))

  return (
    <>
      <BlueLineSection
        hide={!show}
        className="web-manage-create-step"
        title="Step 2 Protocol Selection"
      >
        {/*<h2>Deposit Limits</h2>*/}
        <div className="web-manage-create-step-2col">
          <Select
            label="Denomination Assets"
            value={baseTokenAddress}
            onChange={onBaseTokenChange}
            objOptions={baseTokenOptions}
          />
        </div>
        <div className="web-manage-create-step-2col">
          <Input
            type="number"
            label="Minimum Deposit Amount"
            value={minAmount}
            min={minAmountNumber}
            error={minAmountError}
            onChange={setMinAmount}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
          <Input
            type="number"
            label="Maximum Deposit Amount"
            value={maxAmount}
            onChange={setMaxAmount}
            error={maxAmountError}
            maxNumber={10000000000}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
        </div>
        <h3>select protocol allowed</h3>
        <ul className="web-manage-create-step-product-list">
          {derivativeList.map((item: ProductProps, index: number) => (
            <li
              key={index}
              onClick={() => onSelect(index)}
              className={classNames({ active: selectIndex.includes(index) })}
            >
              <Image src={`products/${item.name}.png`} alt={item.name} />
            </li>
          ))}
        </ul>
        <footer>
          <Button onClick={onBack} outline>
            back
          </Button>
          <Button onClick={onNext} disabled={isDisabled}>
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step2
