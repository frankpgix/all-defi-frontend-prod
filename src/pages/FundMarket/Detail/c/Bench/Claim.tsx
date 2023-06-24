import React, { FC, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSigner } from 'wagmi'
// import BN from 'bignumber.js'

import FundPool from '@/class/FundPool'
import { FundUserDataProps } from '@/class/help'
import tokens, { getTokenByAddress } from '@/config/tokens'

import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'

import { notify } from '@@/common/Toast'

interface Props {
  userData: FundUserDataProps
  getData: () => void
}

const Claim: FC<Props> = ({ userData, getData }) => {
  const { claim } = FundPool
  const { fundAddress } = useParams()
  const { data: signer } = useSigner()

  const value = userData.unclaimedACToken
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const baseToken = useMemo(() => getTokenByAddress(userData.baseToken), [userData.baseToken])
  const acToken = useMemo(() => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]), [baseToken])

  console.log(userData.baseToken, acToken, 33333)
  const onRedeem = async () => {
    if (signer && fundAddress) {
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await claim(fundAddress, signer)
      if (status) {
        await getData()
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

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
        onConfirm={onRedeem}
        onClose={() => setInfoStatus(false)}
        title="Claim AC Token"
        msg={`${userData.unclaimedACToken} acUSDC will be claimed`}
      />
    </>
  )
}

export default Claim
