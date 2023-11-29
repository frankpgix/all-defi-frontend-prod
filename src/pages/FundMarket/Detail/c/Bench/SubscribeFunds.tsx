import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { useParams } from 'react-router-dom'
import { isNaN } from 'lodash'

import FundPool from '@/class/FundPool'
import { FundDetailProps } from '@/class/help'
import tokens, { getTokenByAddress } from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { useAppDispatch } from '@/store'
import { getTokensBalanceAsync } from '@/store/tokens'
import { useTokensData } from '@/store/tokens/hooks'
import { formatNumber } from '@/utils/tools'

import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import { AcUSDCUnit } from '@@/common/TokenUnit'

// import { notify } from '@@/common/Toast'
import Popper from '@@/common/Popper'
// import InfoDialog from '@@/common/Dialog/Info'

interface Props {
  getData: () => void
  data: FundDetailProps
}

const SubscribeFunds: FC<Props> = ({ getData, data }) => {
  const { subscribe } = FundPool
  const { fundAddress } = useParams()
  const { signer } = useProfile()
  const { balance } = useTokensData()
  const dispatch = useAppDispatch()
  const { createNotify, updateNotifyItem } = useNotify()

  const baseToken = useMemo(() => getTokenByAddress(data.baseToken), [data.baseToken])
  // const decimals = useMemo(() => baseToken.decimals, [baseToken])
  const acToken = useMemo(
    () => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]),
    [baseToken]
  )
  // @ts-ignore
  const acTokenBalance = useMemo(() => balance[acToken?.name], [balance, acToken?.name])
  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)

  // console.log(baseToken, acToken, data, 222)
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
    // console.log()
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setValue(currValue)
      setSliderValue(val)
    }
    if (val === 0) {
      setValue('')
    }
  }

  const onInputChange = (val: number | string) => {
    val = Number(val)
    if (isNaN(val)) val = 0
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

  const onSubscribe = async () => {
    if (signer && fundAddress) {
      const notifyId = await createNotify({ type: 'loading', content: 'Subscribe Funds' })
      // 执行购买和质押
      const { status, msg, hash } = await subscribe(Number(value), fundAddress, acToken, signer)
      if (status) {
        // 重新获取余额信息
        await dispatch(getTokensBalanceAsync(signer))
        await getData()
        setValue(0)
        setSliderValue(0)
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Subscribe Funds', content: msg, hash })
      }
    }
  }
  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Allocate to vault</h4>
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
            // disabled={!isInSubscribe}
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
            <Button onClick={onSubscribe} disabled={Number(value) <= 0 || !isInSubscribe}>
              confirm
            </Button>
            {!isInSubscribe && <Tip>Non-Subscription Period</Tip>}
          </footer>
        </div>
      </section>
    </>
  )
}

export default SubscribeFunds
