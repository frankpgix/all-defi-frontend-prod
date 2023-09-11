import React, { FC, useMemo, useState } from 'react'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'
import { useRequest } from 'ahooks'

import AllProtocol from '@/class/AllProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { useTokensData } from '@/store/tokens/hooks'
import { formatNumber } from '@/utils/tools'

import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import BlueLineSection from '@@/web/BlueLineSection'
import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import { AllTokenUnit } from '@@/common/TokenUnit'

// import { notify } from '@@/common/Toast'

import { StakeProps } from './types'

const Stake: FC<StakeProps> = ({ fundData, multiple, fundAddress, getData, direction }) => {
  const { manageStakeAllTokenToFund, manageUnStakeAllTokenToFund, fundUnstakingLimit } = AllProtocol
  const { balance } = useTokensData()
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()
  const { data: maxReduceAmount = 0 } = useRequest(
    async () => await fundUnstakingLimit(fundAddress)
  )
  // console.log(test)
  const [amount, setAmount] = useState<string | number>('')
  const [sliderValue, setSliderValue] = useState(0)

  const isIncrease = useMemo(() => direction === 'increase', [direction])
  // console.log(fundData, stakeData)
  const maxValue = isIncrease ? Number(balance.ALL) : maxReduceAmount

  const maxAum = useMemo(() => {
    if (isIncrease) {
      return BN(isNaN(Number(amount)) ? 0 : Number(amount))
        .multipliedBy(multiple)
        .plus(fundData.realtimeAUMLimit)
        .toNumber()
    }
    const val = BN(fundData.realtimeAUMLimit)
      .minus(BN(isNaN(Number(amount)) ? 0 : Number(amount)).multipliedBy(multiple))
      .toNumber()
    return val < 0.0001 ? 0 : val
  }, [isIncrease, amount, fundData.realtimeAUMLimit, multiple])

  // console.log(maxAum)

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setAmount(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
    // console.log(val, String(val)[String(val).length - 1])
    // if (String(val)[String(val).length - 1] === '.') if (isNaN(Number(val))) val = 0
    // if (val > maxValue) val = maxValue
    // if (val < 0) val = 0
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val))
        .div(maxValue)
        .multipliedBy(100)
        .integerValue()
        .toNumber()
      setAmount(val)
      setSliderValue(currSliderValue)
    }
  }

  const onConfirm = async () => {
    if (Number(amount) > 0 && signer && fundAddress) {
      // const notifyId = notify.loading()
      const notifyId = await createNotify({
        type: 'loading',
        content: 'Change Fund Stake ALL Token'
      })

      const { status, msg, hash } = isIncrease
        ? await manageStakeAllTokenToFund(Number(amount), fundAddress, signer)
        : await manageUnStakeAllTokenToFund(Number(amount), fundAddress, signer)
      if (status) {
        await getData()
        setAmount(0)
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, {
          type: 'error',
          title: 'Change Fund Stake ALL Token',
          content: msg,
          hash
        })
      }
    }
  }
  const isDisabled = useMemo(() => !amount || Number(amount) === 0, [amount])
  return (
    <>
      {fundData.aum > fundData.realtimeAUMLimit && (
        <>
          <Alert show type="error">
            Your current fund AUM has exceeded the fund max AUM limited, please increase the fund
            max AUM limit before settlement.
          </Alert>
          <Blank />
        </>
      )}
      {fundData.nav > fundData.realtimeAUMLimit && fundData.aum <= fundData.realtimeAUMLimit && (
        <>
          <Alert show type="error">
            When the Staking Ratio of the Current Epoch is less than 100%, please stake more ALL
            Token before end of current Epoch to sure to receive 100% of the incentive fee during
            settlement.
          </Alert>
          <Blank />
        </>
      )}
      <BlueLineSection className="web-manage-fund-staker" title={`${direction} Fund Max AUM Limit`}>
        <div className="web-manage-fund-staker-input">
          <DataItem label="current MAX AUM limit" gray>
            {fundData.realtimeAUMLimit}
          </DataItem>
          <div className={`web-manage-create-step-stake-${isIncrease ? 'plus' : 'minus'}`}></div>
          <Input
            value={amount}
            onChange={onInputChange}
            type="number"
            right
            maxNumber={maxValue}
            suffix={<AllTokenUnit>ALL Token</AllTokenUnit>}
            placeholder="0"
            error={Number(amount) === 0 && amount !== ''}
          >
            {isIncrease ? (
              <p>ALL Token Balance: {balance.ALL}</p>
            ) : (
              <p>Staked ALL Token: {maxReduceAmount}</p>
            )}
          </Input>
          <div className="web-manage-create-step-stake-equal"></div>
          <DataItem label="estimated fund MAX AUM limit" gray>
            {formatNumber(maxAum, 6, '0,0.000000')}
          </DataItem>
        </div>
        <div className="web-manage-create-step-slider">
          <Slider value={sliderValue} onChange={onSliderChange} />
        </div>
        <footer>
          <Button disabled={isDisabled} onClick={() => onConfirm()}>
            confirm
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Stake
