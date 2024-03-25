import { FC, useEffect, useMemo, useState } from 'react'

import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useToken } from '@/hooks/Tokens/useToken'
import { useUserBalances } from '@/hooks/useProfile'

import { AddressType } from '@/types/base'

import Cache from '@/utils/cache'
import { calcDecimalsFloor } from '@/utils/tools'
import Button from '@@/common/Button'
import { Input, Slider } from '@@/common/Form'
import { AllTokenUnit } from '@@/common/TokenUnit'
import { TokenIcon } from '@@/common/TokenUnit'
import BlueLineSection from '@@/web/BlueLineSection'

interface Props {
  onConfirm: (data: number) => void
  onBack: () => void
  show: boolean
  multiple: number
  baseTokenAddress: AddressType
}

const Step3: FC<Props> = ({ onConfirm, show, onBack, multiple, baseTokenAddress }) => {
  const { getTokenByAddress } = useToken()
  const { balances } = useUserBalances()

  const [amount, setAmount] = useState<string | number>('')
  const [sliderValue, setSliderValue] = useState(0)

  const maxValue = Number(balances.ALLTOKEN)
  const maxAUM = useMemo(
    () => BN(Number(amount)).multipliedBy(multiple).toNumber(),
    [amount, multiple]
  )
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setAmount(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
    if (isNaN(Number(val))) val = ''
    if (Number(val) > maxValue) val = maxValue
    if (Number(val) < 0) val = ''
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val))
        .div(maxValue)
        .multipliedBy(100)
        .integerValue()
        .toNumber()
      setAmount(val)
      setSliderValue(currSliderValue)
    }
    // console.log(val, isNaN(Number(val)))
  }
  const isDisabled = useMemo(() => !amount || Number(amount) === 0, [amount])
  const isErrorValue = useMemo(() => Number(amount) < 1 && amount !== '', [amount])

  useEffect(() => {
    if (amount) {
      Cache.set('CreateFundStep3Temp', { amount })
    }
  }, [amount])

  useEffect(() => {
    const createFundStep3Temp = Cache.get('CreateFundStep3Temp')
    if (createFundStep3Temp) {
      const { amount } = createFundStep3Temp
      setAmount(amount)
    }
  }, [])

  return (
    <>
      <BlueLineSection
        hide={!show}
        className="web-manage-create-step"
        title="Step 3 ALL Token Stake"
      >
        <div className="web-manage-create-step-stake">
          <Input
            className="web-buy-bench-input"
            value={amount}
            onChange={onInputChange}
            right
            error={isErrorValue}
            maxNumber={maxValue}
            suffix={<AllTokenUnit />}
            placeholder="0"
            type="number"
          >
            {isErrorValue ? (
              <p className="fall">Minimum staking amount 1 ALL</p>
            ) : (
              <p>ALL Token Balance: {balances.ALLTOKEN}</p>
            )}
          </Input>
          <div className="web-manage-create-step-stake-equal"></div>
          <dl className="web-manage-create-step-stake-pre">
            <dt>Max AUM Limit</dt>
            <dd>
              {Number(calcDecimalsFloor(maxAUM, 6))}{' '}
              <TokenIcon size="small" name={baseToken?.name} />
            </dd>
          </dl>
        </div>
        <div className="web-manage-create-step-slider">
          <Slider value={sliderValue} onChange={onSliderChange} />
        </div>
        <footer>
          <Button onClick={onBack} outline>
            back
          </Button>
          <Button disabled={isDisabled || isErrorValue} onClick={() => onConfirm(Number(amount))}>
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step3
