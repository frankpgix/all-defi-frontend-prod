import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { useParams } from 'react-router-dom'
// import { useSigner } from 'wagmi'
import { isNaN } from 'lodash'

// import FundPool from '@/class/FundPool'
import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/hooks/help'
import { getTokenByAddress } from '@/config/tokens'
// import { useFundRedeem } from '@/hooks/useFundPool'
import { useNotify } from '@/hooks/useNotify'
import { useStoreProfile } from '@/store/useProfile'
import { useFundRedeem } from '@/hooks/useFundPool'

import { Input, Slider } from '@@/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'

// import { notify } from '@@/common/Toast'

import InfoDialog from '@@/common/Dialog/Info'

interface Props {
  userData: FundUserDataProps
  data: FundDetailProps
  share: ShareCompositionProps
  getData: () => void
}

const RedeemFunds: FC<Props> = ({ data, userData, getData, share }) => {
  const { notifyLoading, notifySuccess, notifyError } = useNotify()
  const { address: account } = useStoreProfile()
  const { fundAddress } = useParams()

  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const baseToken = useMemo(() => getTokenByAddress(data.baseToken), [data.baseToken])

  const isInRedeem = useMemo(() => data.status === 1, [data.status])
  const maxValue = useMemo(() => {
    // console.log(userData.shares, userData.redeemingShares, share.mining, baseToken.decimals)
    return BN(userData.shares).minus(userData.redeemingShares).minus(share.mining).toNumber()
  }, [userData.shares, userData.redeemingShares, share.mining])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setValue(currValue ? currValue : '')
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

  const { onRedeem } = useFundRedeem(fundAddress, account, onSettled)

  const redeemeFund = async () => {
    if (account && fundAddress) {
      notifyLoading()
      await onRedeem(Number(value), baseToken)
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Redeem Funds</h4>
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
          <Slider
            value={sliderValue}
            onChange={(val) => onSliderChange(val)}
            disabled={!isInRedeem}
          />
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
        onConfirm={redeemeFund}
        onClose={() => setInfoStatus(false)}
        title="Redeem Funds"
        msg={`Will redeem ${value} Fund Share, you can claim your AC tokens anytime after final settlement of current epoch`}
      />
    </>
  )
}

export default RedeemFunds
