import React, { FC, useMemo, useState } from 'react'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useTokensData } from '@/store/tokens/hooks'
import { getTokenByAddress } from '@/config/tokens'
import { calcDecimalsFloor } from '@/utils/tools'

import BlueLineSection from '@@/web/BlueLineSection'
import { Input, Slider } from '@@/common/Form'
import { AllTokenUnit } from '@@/common/TokenUnit'
import Button from '@@/common/Button'
import { TokenIcon } from '@@/common/TokenUnit'

interface Props {
  onConfirm: (data: number) => void
  onBack: () => void
  show: boolean
  multiple: number
  baseTokenAddress: string
}

const Step3: FC<Props> = ({ onConfirm, show, onBack, multiple, baseTokenAddress }) => {
  const { balance } = useTokensData()

  const [amount, setAmount] = useState<string | number>('')
  const [sliderValue, setSliderValue] = useState(0)

  const maxValue = Number(balance.ALL)
  const maxAUM = useMemo(() => BN(Number(amount)).multipliedBy(multiple).toNumber(), [amount, multiple])
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setAmount(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
    if (isNaN(Number(val))) val = 0
    if (val > maxValue) val = maxValue
    if (val < 0) val = 0
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val)).div(maxValue).multipliedBy(100).integerValue().toNumber()
      setAmount(Number(val))
      setSliderValue(currSliderValue)
    }
    // console.log(val, isNaN(Number(val)))
  }
  const isDisabled = useMemo(() => !amount || Number(amount) === 0, [amount])
  return (
    <>
      <BlueLineSection hide={!show} className="web-manage-create-step" title="Step 3 ALL Token Stake">
        <div className="web-manage-create-step-stake">
          <Input
            className="web-buy-bench-input"
            value={amount}
            onChange={onInputChange}
            right
            error={amount < 0.1 && amount !== ''}
            maxNumber={maxValue}
            suffix={<AllTokenUnit />}
            placeholder="0"
            type="number"
          >
            <p>ALL Token Balance: {balance.ALL}</p>
          </Input>
          <div className="web-manage-create-step-stake-equal"></div>
          <dl className="web-manage-create-step-stake-pre">
            <dt>Fund Max AUM Limit</dt>
            <dd>
              {Number(calcDecimalsFloor(maxAUM, 6))} <TokenIcon size="small" name={baseToken?.name} />
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
          <Button disabled={isDisabled} onClick={() => onConfirm(Number(amount))}>
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step3
