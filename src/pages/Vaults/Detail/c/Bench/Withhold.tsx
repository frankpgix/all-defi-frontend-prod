import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useProfile } from '@/hooks/useProfile'
import { useWithhold } from '@/hooks/Contracts/useVault'

import { VaultDetailProps, VaultUserDetailProps, ShareCompositionProps } from '@/types/vault'

import { Input, Slider } from '@@/common/Form'
import Button from '@@/common/Button'
import Tip from '@@/common/Tip'
import InfoDialog from '@@/common/Dialog/Info'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
  share: ShareCompositionProps
  getData: () => void
}

const Withhold: FC<Props> = ({ data, userData, getData, share }) => {
  const { account } = useProfile()
  const { onWithhold } = useWithhold(data.address)

  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const isInWithhold = useMemo(() => data.status === 1, [data.status])
  const maxValue = useMemo(() => {
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

  const goWithhold = async () => {
    if (account) {
      await onWithhold(Number(value), account)
      getData()
      setValue(0)
      setSliderValue(0)
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
              disabled={Number(value) <= 0 || !isInWithhold}
            >
              confirm
            </Button>
            {!isInWithhold && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
        <hr />
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={goWithhold}
        onClose={() => setInfoStatus(false)}
        title="Withhold From Vault"
        msg={`Will withhold ${value} vault Share, you can claim your AC tokens anytime after final settlement of current epoch`}
      />
    </>
  )
}

export default Withhold
