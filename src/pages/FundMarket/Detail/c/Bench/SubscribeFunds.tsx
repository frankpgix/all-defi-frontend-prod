import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { useParams } from 'react-router-dom'
import { isNaN } from 'lodash'

import { FundDetailProps } from '@/class/help'
import tokens, { getTokenByAddress } from '@/config/tokens'
import { useStoreBalances, useStoreProfile } from '@/store/useProfile'
import { useFundSubscribe } from '@/hooks/useFundPool'
import { useNotify } from '@/hooks/useNotify'

import { formatNumber } from '@/utils/tools'

import { Input, Slider } from '@@/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import { AcUSDCUnit } from '@@/common/TokenUnit'

interface Props {
  getData: () => void
  data: FundDetailProps
}

const SubscribeFunds: FC<Props> = ({ getData, data }) => {
  const { fundAddress } = useParams()
  const { balances } = useStoreBalances()
  const { address: account } = useStoreProfile()
  const { notifyLoading, notifySuccess, notifyError } = useNotify()

  const baseToken = useMemo(() => getTokenByAddress(data.baseToken), [data.baseToken])

  const acToken = useMemo(
    () => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]),
    [baseToken]
  )
  // @ts-ignore
  const acTokenBalance = useMemo(() => balances[acToken?.name], [balances, acToken?.name])
  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)

  const maxAum = useMemo(
    () =>
      Number(
        formatNumber(
          Math.max(
            BN(data.realtimeAUMLimit).minus(data.aum).minus(data.subscribingACToken).toNumber(),
            0
          ),
          4,
          '0.0000'
        )
      ),
    [data.realtimeAUMLimit, data.aum, data.subscribingACToken]
  )
  const maxBalance = useMemo(() => BN(acTokenBalance).toNumber(), [acTokenBalance])
  const maxValue = useMemo(() => Math.min(maxAum, maxBalance), [maxAum, maxBalance])

  const isInSubscribe = useMemo(() => [0, 1, 2].includes(data.status), [data.status])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setValue(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
    if (isNaN(Number(val))) val = 0
    if (val > maxValue) val = maxValue
    if (val < 0) val = 0
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val))
        .div(maxValue)
        .multipliedBy(100)
        .integerValue()
        .toNumber()
      setValue(Number(val))
      setSliderValue(currSliderValue)
    }
  }
  const onSettled = async (data, error) => {
    if (error) {
      notifyError(error)
    } else {
      notifySuccess()
      await getData()
      setValue('')
      setSliderValue(0)
    }
  }

  const { onSubscribe } = useFundSubscribe(fundAddress, account, onSettled)

  const subscribeFund = async () => {
    if (account && fundAddress) {
      notifyLoading()
      await onSubscribe(Number(value), acToken)
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Subscribe Funds</h4>
        <div className="web-fund-detail-bench-input">
          <Input
            value={value}
            onChange={(val) => onInputChange(val)}
            maxNumber={maxValue}
            suffix={<AcUSDCUnit name={acToken?.name} />}
            right
            placeholder="0"
            type="number"
            error={value !== '' && Number(value) === 0}
            disabled={!isInSubscribe}
          >
            <p>
              {acToken?.name} Balance: {acTokenBalance}
            </p>
            <p>Capacity Available: {maxAum}</p>
          </Input>
        </div>
        <div className="web-fund-detail-bench-slider">
          <Slider value={sliderValue} onChange={(val) => onSliderChange(val)} />
        </div>
        <div className="web-fund-detail-bench-action">
          <footer>
            <Button onClick={subscribeFund}>confirm</Button>
            {!isInSubscribe && <Tip>Non-Subscription Period</Tip>}
          </footer>
        </div>
      </section>
    </>
  )
}

export default SubscribeFunds
