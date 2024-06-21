import { FC, useMemo, useState } from 'react'

import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useStake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'
import { useToken, useUserBalances } from '@/hooks/useToken'

import { VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

// import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import { Input, Slider } from '@@/common/Form'
import Tip from '@@/common/Tip'
import { AcUSDCUnit } from '@@/common/TokenUnit'

interface Props {
  getData: () => void
  data: VaultDetailProps
  base: VaultBaseInfoProps
}

const Allocate: FC<Props> = ({ getData, data, base }) => {
  const { getTokenByName } = useToken()
  const { account } = useProfile()
  const { balances, refetch: reBalances } = useUserBalances()
  const { onStake } = useStake(data.address)

  const acToken = useMemo(
    () => getTokenByName(data.underlyingToken.acTokenName),
    [data.underlyingToken]
  )

  const acTokenBalance = useMemo(() => balances[acToken.name], [balances, acToken.name])
  const [value, setValue] = useState<number | string>('')
  const [inputValue, setInputValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)

  // const maxAum = useMemo(
  //   () =>
  //     Number(
  //       formatNumber(
  //         Math.max(BN(data.aum).minus(data.beginningAUM).minus(data.stakingACToken).toNumber(), 0),
  //         4,
  //         '0.0000'
  //       )
  //     ),
  //   [data.aum, data.beginningAUM, data.stakingACToken]
  // )
  // const maxBalance = useMemo(() => BN(acTokenBalance).toNumber(), [acTokenBalance])
  const maxValue = useMemo(() => Math.min(acTokenBalance), [acTokenBalance])
  // console.log(maxValue, maxAum, acTokenBalance)
  // const maxValue = useMemo(() => 10000, [maxAum, maxBalance])

  const isInAllocate = useMemo(() => [0, 1].includes(data.status), [data.status])

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
    setInputValue(val)
    if (isNaN(val)) val = 0
    // if (val > maxValue) val = maxValue
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

  const goAllocate = async () => {
    if (account) {
      await onStake(acToken, Number(value), account, () => {
        reBalances()
        getData()
        setValue(0)
        setSliderValue(0)
      })
    }
  }

  const minAmountError = useMemo(
    () => inputValue !== '' && Number(inputValue) < base.minimumStake,
    [inputValue]
  )
  const maxAmountError = useMemo(
    () => inputValue !== '' && Number(inputValue) > maxValue,
    [inputValue]
  )
  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Stake to vault</h4>
        <div className="web-fund-detail-bench-input">
          <Input
            value={value}
            onChange={(val) => onInputChange(val)}
            maxNumber={maxValue}
            suffix={<AcUSDCUnit name={acToken?.name} />}
            right
            placeholder="0"
            type="number"
            error={(value !== '' && Number(value) === 0) || minAmountError || maxAmountError}
            // disabled={!isInSubscribe}
          >
            {minAmountError && (
              <p className="fall">
                Minimum stake amount {base.minimumStake} {acToken.name}
              </p>
            )}
            {/* {maxAmountError && (
              <p className="fall">
                Maxmum stake amount {maxValue} {acToken.name}
              </p>
            )} */}
            <p>
              {acToken.name} Balance: {acTokenBalance}
            </p>
            {/* <p>Capacity Available: {maxAum}</p> */}
          </Input>
        </div>
        <div className="web-fund-detail-bench-slider">
          <Slider value={sliderValue} onChange={(val) => onSliderChange(val)} />
        </div>
        <div className="web-fund-detail-bench-action">
          <footer>
            <Button onClick={goAllocate} disabled={Number(value) <= 0 || !isInAllocate}>
              confirm
            </Button>
            {!isInAllocate && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
      </section>
    </>
  )
}

export default Allocate
