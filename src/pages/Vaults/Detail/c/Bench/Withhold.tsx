import { FC, useMemo, useState } from 'react'

import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useUnstake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'

import { VaultDetailProps, VaultUserDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Slider } from '@@/common/Form'
import Tip from '@@/common/Tip'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
  getData: () => void
}

const Unstake: FC<Props> = ({ data, userData, getData }) => {
  const { account } = useProfile()
  const { onUnstake } = useUnstake(data.address)

  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const isInUnstake = useMemo(() => data.status === 0, [data.status])
  const maxValue = useMemo(() => {
    return BN(userData.shares).minus(userData.unstakingShare).toNumber()
  }, [userData.shares, userData.unstakingShare])

  const onSliderChange = (val: number) => {
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

  const goUnstake = async () => {
    if (account) {
      await onUnstake(data.underlyingToken, Number(value), account)
      getData()
      setValue(0)
      setSliderValue(0)
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Unstake from vault</h4>
        <div className="web-fund-detail-bench-input">
          <Input
            value={value}
            onChange={(val) => onInputChange(val)}
            maxNumber={maxValue}
            suffix="Shares"
            right
            placeholder="0"
            type="number"
            error={value !== '' && Number(value) === 0}
            // disabled={!isInRedeem}
          >
            <p>Available Shares: {maxValue}</p>
            {/* <p>Shares in wallet: {share.balance}</p>
            <p>Shares in fund: {share.reserve}</p>
            <p>Shares in redeeming: {userData.redeemingShares}</p> */}
          </Input>
        </div>
        <div className="web-fund-detail-bench-slider">
          <Slider value={sliderValue} onChange={(val) => onSliderChange(val)} />
        </div>
        <div className="web-fund-detail-bench-action">
          <footer>
            <Button
              onClick={() => setInfoStatus(true)}
              disabled={Number(value) <= 0 || !isInUnstake}
            >
              confirm
            </Button>
            {!isInUnstake && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
        <hr />
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={goUnstake}
        onClose={() => setInfoStatus(false)}
        title="Unstake From Vault"
        msg={`Will Unstake ${value} vault Share, you can claim your AC tokens anytime after final settlement of current epoch`}
      />
    </>
  )
}

export default Unstake
