import { FC, useState } from 'react'
// import BN from 'bignumber.js'

// import FundPool from '@/class/FundPool'
import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'
// import { useNotify } from '@/hooks/useNotify'
import { useClaimCompensation } from '@/hooks/Contracts/useVault'
import { AddressType } from '@/types/base'

import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import { AllTokenUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'
import Popper from '@@/common/Popper'

// import { notify } from '@@/common/Toast'

interface Props {
  unclaimedALL: number
  fundAddress: AddressType
  callback: () => void
}

const Claim: FC<Props> = ({ unclaimedALL, callback, fundAddress }) => {
  const { account } = useProfile()
  // const { claimCompensation } = FundPool
  const { onClaim } = useClaimCompensation(fundAddress)
  // const { createNotify, updateNotifyItem } = useNotify()

  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const goClaim = async () => {
    if (account && fundAddress) {
      await onClaim(account)
      callback()
    }
  }
  if (unclaimedALL === 0) return null
  return (
    <>
      <section className="web-fund-detail-bench web-fund-detail-claim">
        <h4>
          Claim ALL Token{' '}
          <Popper content="Your withhold might need to be processed in multiple epochs. This is to ensure the integrity of the vault is not affected by withholding. Managers need to take strategy, market condition ,and third-party Defi protocols into consideration, which can take longer time to process all withholding. You might receive certain rewards based on the actual withholding schedule." />
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
        onConfirm={goClaim}
        onClose={() => setInfoStatus(false)}
        title="Claim ALL Token"
        msg={`${formatNumber(unclaimedALL, 8, '0.00000000')} ALL will be claimed`}
      />
    </>
  )
}

export default Claim
