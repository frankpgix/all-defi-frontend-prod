import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { useParams } from 'react-router-dom'
import { isNaN } from 'lodash'

import FundPool from '@/class/FundPool'
import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'
import { getDecimalsByAddress } from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'

import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import Popper from '@@/common/Popper'

import { notify } from '@@/common/Toast'

import InfoDialog from '@@/common/Dialog/Info'

interface Props {
  userData: FundUserDataProps
  data: FundDetailProps
  share: ShareCompositionProps
  getData: () => void
}

const RedeemFunds: FC<Props> = ({ data, userData, getData, share }) => {
  const { redeem } = FundPool
  const { fundAddress } = useParams()
  const { signer } = useProfile()

  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const decimals = useMemo(() => getDecimalsByAddress(data.baseToken), [data.baseToken])

  const isInRedeem = useMemo(() => data.status === 1, [data.status])
  const maxValue = useMemo(() => {
    // console.log(userData.shares, userData.redeemingShares, share.mining)
    return BN(userData.shares).minus(userData.redeemingShares).minus(share.mining).toNumber()
  }, [userData.shares, userData.redeemingShares, share.mining])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setValue(currValue)
      setSliderValue(val)
    }
  }

  const onInputChange = (val: number | string) => {
    val = Number(val)
    if (isNaN(val)) val = 0
    if (val > maxValue) val = maxValue
    if (val < 0) val = 0
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val)).div(maxValue).multipliedBy(100).integerValue().toNumber()
      setValue(Number(val))
      setSliderValue(currSliderValue)
    }
  }

  const onRedeem = async () => {
    if (signer && fundAddress) {
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await redeem(Number(value), fundAddress, decimals, signer)
      if (status) {
        await getData()
        notify.update(notifyId, 'success')
        setValue(0)
        setSliderValue(0)
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>
          Redeem Funds <Popper content="Fund is open for redemption only during Open Period" />
        </h4>
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
            disabled={!isInRedeem}
          >
            <p>Redeemable Fund Shares: {maxValue}</p>
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
            <Button onClick={() => setInfoStatus(true)} disabled={value <= 0 || !isInRedeem}>
              confirm
            </Button>
            {!isInRedeem && <Tip>Non-Redemption Period</Tip>}
          </footer>
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={onRedeem}
        onClose={() => setInfoStatus(false)}
        title="Redeem Funds"
        msg={`Will redeem ${value} Fund Share, you can claim your AC tokens anytime after final settlement of current epoch`}
      />
    </>
  )
}

export default RedeemFunds
