import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { useParams } from 'react-router-dom'
import { isNaN } from 'lodash'

import FundPool from '@/class/FundPool'
import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'
import { getDecimalsByAddress } from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import Popper from '@@/common/Popper'

// import { notify } from '@@/common/Toast'

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
  const { createNotify, updateNotifyItem } = useNotify()

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

  const onRedeem = async () => {
    if (signer && fundAddress) {
      const notifyId = await createNotify({ type: 'loading', content: 'Withhold from vault' })
      // 执行购买和质押
      const { status, msg, hash } = await redeem(Number(value), fundAddress, decimals, signer)
      if (status) {
        await getData()
        updateNotifyItem(notifyId, { type: 'success', hash })
        setValue(0)
        setSliderValue(0)
      } else {
        updateNotifyItem(notifyId, {
          type: 'error',
          title: 'Withhold from vault',
          content: msg,
          hash
        })
      }
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <h4>Withhold from vault</h4>
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
              disabled={Number(value) <= 0 || !isInRedeem}
            >
              confirm
            </Button>
            {!isInRedeem && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={onRedeem}
        onClose={() => setInfoStatus(false)}
        title="Withhold From Vault"
        msg={`Will withhold ${value} vault Share, you can claim your AC tokens anytime after final settlement of current epoch`}
      />
    </>
  )
}

export default RedeemFunds
