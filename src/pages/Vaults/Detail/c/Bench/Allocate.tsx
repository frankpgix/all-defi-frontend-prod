import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { tokens } from '@/config/tokens'
import { useProfile, useUserBalances } from '@/hooks/useProfile'

import { formatNumber } from '@/utils/tools'

import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import { VaultDetailProps } from '@/types/vault'

import { useAllocate } from '@/hooks/useVault'

interface Props {
  getData: () => void
  data: VaultDetailProps
}

const Allocate: FC<Props> = ({ getData, data }) => {
  const { account } = useProfile()
  const { balances, refetch: reBalances } = useUserBalances()
  const { onAllocate } = useAllocate(data.address)

  const baseToken = useMemo(() => data.underlyingToken, [data.underlyingToken])
  const acToken = useMemo(
    () => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]),
    [baseToken]
  )

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
    if (account) {
      await onAllocate(acToken, Number(value), account)
      reBalances()
      getData()
      setValue(0)
      setSliderValue(0)
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
            {!isInSubscribe && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
      </section>
    </>
  )
}

export default Allocate
