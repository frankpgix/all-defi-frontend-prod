import React, { FC, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
// import { useSigner } from 'wagmi'
// import BN from 'bignumber.js'

// import FundPool from '@/class/FundPool'
import { FundUserDataProps } from '@/hooks/help'
import { useStoreProfile } from '@/store/useProfile'
import { useFundClaim } from '@/hooks/useFundPool'
import { useNotify } from '@/hooks/useNotify'

import tokens, { getTokenByAddress } from '@/config/tokens'

import { Input } from '@@/form'
import Button from '@@/common/Button'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'

// import { notify } from '@@/common/Toast'

interface Props {
  userData: FundUserDataProps
  getData: () => void
}

const Claim: FC<Props> = ({ userData, getData }) => {
  // const { claim } = FundPool
  const { fundAddress } = useParams()
  const account = useStoreProfile((state: any) => state.address)
  const { notifyLoading, notifySuccess, notifyError } = useNotify()
  // const { data: signer } = useSigner()

  const value = userData.unclaimedACToken
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const baseToken = useMemo(() => getTokenByAddress(userData.baseToken), [userData.baseToken])
  const acToken = useMemo(
    () => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]),
    [baseToken]
  )

  const onSettled = async (data: any, error: any) => {
    if (error) {
      notifyError(error)
    } else {
      notifySuccess()
      await getData()
    }
  }

  const { onClaim } = useFundClaim(fundAddress ?? '', account, onSettled)

  const claimFund = async () => {
    if (account && fundAddress) {
      notifyLoading()
      await onClaim()
    }
  }

  // const onRedeem = async () => {
  //   if (signer && fundAddress) {
  //     const notifyId = notify.loading()
  //     // 执行购买和质押
  //     const { status, msg } = await claim(fundAddress, signer)
  //     if (status) {
  //       await getData()
  //       notify.update(notifyId, 'success')
  //     } else {
  //       notify.update(notifyId, 'error', msg)
  //     }
  //   }
  // }

  return (
    <>
      <section className="web-fund-detail-bench">
        <hr />
        <h4>Claim AC Token</h4>
        <div className="web-fund-detail-bench-input">
          <Input
            value={value}
            disabled={value <= 0}
            readonly={value > 0}
            onChange={() => null}
            type="number"
            suffix={<AcUSDCUnit name={acToken?.name} />}
            right
          />
        </div>
        <div className="web-fund-detail-bench-action">
          <Button onClick={() => setInfoStatus(true)} disabled={value <= 0}>
            confirm
          </Button>
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={claimFund}
        onClose={() => setInfoStatus(false)}
        title="Claim AC Token"
        msg={`${userData.unclaimedACToken} acUSDC will be claimed`}
      />
    </>
  )
}

export default Claim
