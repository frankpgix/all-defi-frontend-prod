import { FC, useMemo, useState, useEffect } from 'react'
import { without } from 'lodash'
import classNames from 'classnames'

import { baseTokenOptions, getTokenByAddress } from '@/config/tokens'
import { VaultDerivativesProps } from '@/types/vault'
import { AddressType } from '@/types/base'
import { CreateVaultStep2DataTypes } from '@/types/createVault'
import { Input, Select } from '@@/common/Form'
import Cache from '@/utils/cache'

import BlueLineSection from '@@/web/BlueLineSection'
import { TokenIcon } from '@@/common/TokenUnit'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

interface Props {
  onConfirm: (data: CreateVaultStep2DataTypes) => void
  onBack: () => void
  show: boolean
  derivativeList: VaultDerivativesProps[]
}

const Step2: FC<Props> = ({ onConfirm, show, onBack, derivativeList }) => {
  const [selectIndex, setSelectIndex] = useState<number[]>([])
  const [minAmount, setMinAmount] = useState<string | number>('')
  const [maxAmount, setMaxAmount] = useState<string | number>('')
  const [baseTokenAddress, setBaseTokenAddress] = useState(baseTokenOptions[0].value)
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])
  // const addresss = useMemo(
  //   () => compact(selectIndex.map((index: number) => derivativeList[index])),
  //   [selectIndex]
  // )
  const onSelect = (index: number) => {
    if (selectIndex.includes(index)) {
      setSelectIndex(without(selectIndex, index))
    } else {
      setSelectIndex([...selectIndex, index])
    }
  }

  const onNext = () => {
    const addresss = selectIndex.map((index: number) => derivativeList[index])
    onConfirm({
      addresss,
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
  const baseTokenName = useMemo(
    () => (baseToken.name === 'WETH' ? 'ETH' : baseToken.name),
    [baseToken.name]
  )
  const onBaseTokenChange = (address: number | string) =>
    setBaseTokenAddress(String(address) as AddressType)

  useEffect(() => {
    if (selectIndex.length || minAmount || maxAmount) {
      Cache.set('CreateFundStep2Temp', { selectIndex, minAmount, maxAmount, baseTokenAddress })
    }
  }, [selectIndex, minAmount, maxAmount, baseTokenAddress])

  useEffect(() => {
    const createFundStep2Temp = Cache.get('CreateFundStep2Temp')
    if (createFundStep2Temp) {
      const { selectIndex, minAmount, maxAmount, baseTokenAddress } = createFundStep2Temp

      setBaseTokenAddress(baseTokenAddress)
      setSelectIndex(selectIndex)
      setMinAmount(minAmount)
      setMaxAmount(maxAmount)
    }
  }, [])

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
          >
            {minAmountError && (
              <p className="fall">
                Minimum deposit amount {minAmountNumber} {baseTokenName}
              </p>
            )}
          </Input>
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
          {derivativeList.map((item, index: number) => (
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
