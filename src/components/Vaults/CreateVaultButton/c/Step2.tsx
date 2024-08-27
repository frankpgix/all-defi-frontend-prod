import { FC, useEffect, useMemo, useState } from 'react'

import { useToken, useUnderlyingTokenOptions } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { CreateVaultStep2DataTypes } from '@/types/createVault'

import Cache from '@/utils/cache'
import Button from '@@/common/Button'
import { Input, Select } from '@@/common/Form'
import Image from '@@/common/Image'
import { TokenIcon } from '@@/common/TokenUnit'
import BlueLineSection from '@@/web/BlueLineSection'

interface Props {
  onConfirm: (data: CreateVaultStep2DataTypes) => void
  onBack: () => void
  show: boolean
}

const Step2: FC<Props> = ({ onConfirm, show, onBack }) => {
  const { getTokenByAddress } = useToken()
  const baseTokenOptions = useUnderlyingTokenOptions()
  // console.log(baseTokenOptions, baseTokenOptions[0].value)
  const [minAmount, setMinAmount] = useState<string | number>('')
  const [underlyingAddress, setUnderlyingAddress] = useState(baseTokenOptions[0].value)
  const underlyingToken = useMemo(() => getTokenByAddress(underlyingAddress), [underlyingAddress])

  const onNext = () => {
    onConfirm({
      minimumStake: Number(minAmount),
      underlying: underlyingAddress
    })
  }
  const minAmountNumber = useMemo(() => {
    const zero = [...new Array(underlyingToken.precision - 1)].map(() => '0').join('')
    return Number(`0.${zero}1`)
  }, [underlyingToken.precision])

  const minAmountError = useMemo(
    () => Number(minAmount) < minAmountNumber && minAmount !== '',
    [minAmount, minAmountNumber]
  )
  const isDisabled = useMemo(
    () => !minAmount || Number(minAmount) === 0 || minAmountError,
    [minAmount, minAmountError]
  )

  const onBaseTokenChange = (address: number | string) =>
    setUnderlyingAddress(String(address) as AddressType)

  useEffect(() => {
    if (minAmount) {
      Cache.set('CreateFundStep2Temp', { minAmount, underlyingAddress })
    }
  }, [minAmount, underlyingAddress])

  useEffect(() => {
    const createFundStep2Temp = Cache.get('CreateFundStep2Temp')
    if (createFundStep2Temp) {
      const { minAmount, underlyingAddress } = createFundStep2Temp

      setUnderlyingAddress(underlyingAddress)
      setMinAmount(minAmount)
    }
  }, [])

  return (
    <>
      <BlueLineSection
        hide={!show}
        web={false}
        className="c-create-step"
        title="Step 2 Protocol Selection"
      >
        {/*<h2>Deposit Limits</h2>*/}
        {/* {underlyingAddress} */}
        <div className="c-create-step-1col">
          <Select
            label="Denomination Assets"
            disabled
            value={underlyingAddress}
            onChange={onBaseTokenChange}
            objOptions={baseTokenOptions}
          />
          <p className="c-create-step-text">
            The denomination asset is the asset in which depositors deposit into your vault and
            earnings are distributed in that asset
          </p>
        </div>
        <div className="c-create-step-2col">
          <Input
            type="number"
            label="Minimum Deposit Amount"
            value={minAmount}
            min={minAmountNumber}
            error={minAmountError}
            onChange={setMinAmount}
            innerSuffix={<TokenIcon size="small" name={underlyingToken.name} />}
          >
            {minAmountError && (
              <p className="fall">
                Minimum deposit amount {minAmountNumber} {underlyingToken.name}
              </p>
            )}
          </Input>
        </div>
        <h3>select protocol allowed</h3>
        <ul className="c-create-step-product-list">
          {/* <li className="active">
           */}
          <li>
            <Image src={`/symbol/bnb.svg`} alt={'CEFFU'} />
          </li>
        </ul>
        {/*  <Image src={`/products/CEFFU.png`} alt={'CEFFU'} /> */}
        {/* <h3>select protocol allowed</h3>
        <ul className="c-create-step-product-list">
          {derivativeList.map((item, index: number) => (
            <li
              key={index}
              onClick={() => onSelect(index)}
              className={classNames({ active: selectIndex.includes(index) })}
            >
              <Image src={`products/${item.name}.png`} alt={item.name} />
            </li>
          ))}
        </ul> */}
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
