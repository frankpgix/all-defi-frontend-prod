import React, { FC, useState } from 'react'
// import BN from 'bignumber.js'

import FundPool from '@/class/FundPool'
import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import { AllTokenUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'
import Popper from '@@/common/Popper'

// import { notify } from '@@/common/Toast'

interface Props {
  unclaimedALL: number
  fundAddress: string
  callback: (update: boolean) => void
}

const Claim: FC<Props> = ({ unclaimedALL, callback, fundAddress }) => {
  const { signer } = useProfile()
  const { claimCompensation } = FundPool
  const { createNotify, updateNotifyItem } = useNotify()

  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const onClaim = async () => {
    if (signer && fundAddress) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim ALL Token' })
      // 执行购买和质押
      const { status, msg, hash } = await claimCompensation(fundAddress, signer)
      if (status) {
        await callback(true)
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Claim ALL Token', content: msg, hash })
      }
    }
  }
  if (unclaimedALL === 0) return null
  return (
    <>
      <section className="web-fund-detail-bench web-fund-detail-claim">
        <h4>
          Claim ALL Token{' '}
          <Popper content="Your redemption might need to be processed in multiple epochs. This is to ensure that the integrity of the fund is not affected my redemptions. Fund managers need to take strategy, market conditions, and third-party DeFi protocols into consideration, which may result in redemptions spanning multiple epochs. You may receive certain rewards based on the actual redemption schedule." />
        </h4>
        <div className="web-fund-detail-bench-input">
          <Input
            value={unclaimedALL}
            readonly
            onChange={() => null}
            disabled
            type="number"
            suffix={<AllTokenUnit children="ALL Token" />}
            right
          />
        </div>
        <div className="web-fund-detail-bench-action">
          <Button size="medium" disabled={unclaimedALL === 0} onClick={() => setInfoStatus(true)}>
            confirm
          </Button>
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={onClaim}
        onClose={() => setInfoStatus(false)}
        title="Claim ALL Token"
        msg={`${formatNumber(unclaimedALL, 8, '0.00000000')} ALL will be claimed`}
      />
    </>
  )
}

export default Claim
