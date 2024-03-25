import { FC, useMemo, useState } from 'react'

import BN from 'bignumber.js'

import { useVaultChangeStakeALL, useVaultUnstakeLimit } from '@/hooks/Contracts/useAllProtocol'
import { useUserBalances } from '@/hooks/Tokens/useToken'
import { useProfile } from '@/hooks/useProfile'

import { AddressType } from '@/types/base'
import { VaultDetailProps, VaultStakeType } from '@/types/vault'

import { formatNumber } from '@/utils/tools'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import { Input, Slider } from '@@/common/Form'
import { AllTokenUnit } from '@@/common/TokenUnit'
import TokenValue from '@@/common/TokenValue'
import BlueLineSection from '@@/web/BlueLineSection'

interface StakeProps {
  direction: VaultStakeType
  vaultDetail: VaultDetailProps
  multiple: number
  vaultAddress: AddressType
  getData: () => void
}

const Stake: FC<StakeProps> = ({ direction, vaultAddress, vaultDetail, multiple, getData }) => {
  const { account } = useProfile()
  const { balances } = useUserBalances()

  const { data: maxReduceAmount } = useVaultUnstakeLimit(vaultAddress)
  const { onVaultChangeStakeALL } = useVaultChangeStakeALL()

  const [amount, setAmount] = useState<string | number>('')
  const [sliderValue, setSliderValue] = useState(0)

  const isIncrease = useMemo(() => direction === 'increase', [direction])
  // console.log(fundData)
  const maxValue = isIncrease ? Number(balances.ALLTOKEN) : maxReduceAmount

  const maxAum = useMemo(() => {
    if (isIncrease) {
      return BN(isNaN(Number(amount)) ? 0 : Number(amount))
        .multipliedBy(multiple)
        .plus(vaultDetail.realtimeAUMLimit)
        .toNumber()
    }
    const val = BN(vaultDetail.realtimeAUMLimit)
      .minus(BN(isNaN(Number(amount)) ? 0 : Number(amount)).multipliedBy(multiple))
      .toNumber()
    return val < 0.0001 ? 0 : val
  }, [isIncrease, amount, vaultDetail.realtimeAUMLimit, multiple])

  // console.log(maxAum)

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setAmount(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
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
    if (Number(amount) > 1 && account && vaultAddress) {
      onVaultChangeStakeALL(vaultAddress, Number(amount), direction, account, () => {
        getData()
        setAmount(0)
      })
    }
  }
  const isDisabled = useMemo(() => !amount || Number(amount) <= 1, [amount])
  return (
    <>
      {vaultDetail.aum > vaultDetail.realtimeAUMLimit && (
        <>
          <Alert show type="error">
            Your current fund AUM has exceeded the fund max AUM limited, please increase the fund
            max AUM limit before settlement.
          </Alert>
          <Blank />
        </>
      )}
      {vaultDetail.nav > vaultDetail.realtimeAUMLimit &&
        vaultDetail.aum <= vaultDetail.realtimeAUMLimit && (
          <>
            <Alert show type="error">
              When the Staking Ratio of the Current Epoch is less than 100%, please stake more ALL
              Token before end of current Epoch to sure to receive 100% of the incentive fee during
              settlement.
            </Alert>
            <Blank />
          </>
        )}
      <BlueLineSection
        className="web-manage-fund-staker"
        title={`${direction} Vault Max AUM Limit`}
      >
        <div className="web-manage-fund-staker-input">
          <DataItem label="current MAX AUM limit" gray>
            <TokenValue
              value={vaultDetail.realtimeAUMLimit}
              token={vaultDetail.underlyingToken}
              format="0.00"
              noUnit
            />
            {/* {formatNumber(fundData.realtimeAUMLimit, 6, '0.000000')} */}
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
            error={Number(amount) < 1 && amount !== ''}
          >
            {isIncrease ? (
              <p>ALL Token Balance: {balances.ALLTOKEN}</p>
            ) : (
              <p>Staked ALL Token: {maxReduceAmount}</p>
            )}
          </Input>
          <div className="web-manage-create-step-stake-equal"></div>
          <DataItem label="Estimated Vault Max Aum Limit" gray>
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
