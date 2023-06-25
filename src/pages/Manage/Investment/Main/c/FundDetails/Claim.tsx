import React, { FC, useState } from 'react'

import { formatNumber } from '@/utils/tools'

import { useStoreProfile } from '@/store/useProfile'
import { useFundClaimCompensation } from '@/hooks/useFundPool'
import { useNotify } from '@/hooks/useNotify'

import { Input } from '@@/Form'
import Button from '@@/common/Button'
import { AllTokenUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'
import Popper from '@@/common/Popper'

interface Props {
  unclaimedALL: number
  fundAddress: string
  callback: (update: boolean) => void
}

const Claim: FC<Props> = ({ unclaimedALL, callback, fundAddress }) => {
  const { address: account } = useStoreProfile()
  const { notifyLoading, notifySuccess, notifyError } = useNotify()

  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const onMutate = () => notifyLoading()

  const onSettled = async (data, error) => {
    if (error) {
      notifyError(error)
    } else {
      notifySuccess()
      callback()
    }
  }
  const { onClaimCompensation } = useFundClaimCompensation(
    fundAddress,
    account,
    onSettled,
    onMutate
  )

  if (unclaimedALL === 0) return null
  return (
    <>
      <section className="web-fund-detail-bench web-fund-detail-claim">
        <h4>
          Claim ALL Token{' '}
          <Popper content="Your redemption might need to be processed in multiple epochs. This is to ensure the integrity of the fund is not affected by redemptions. Fund managers need to take strategy, market condition ,and third-party Defi protocols into consideration, which can take longer time to process all redemptions. You might receive certain rewards based on the actual redemption schedule." />
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
        onConfirm={onClaimCompensation}
        onClose={() => setInfoStatus(false)}
        title="Claim ALL Token"
        msg={`${formatNumber(unclaimedALL, 8, '0.00000000')} ALL will be claimed`}
      />
    </>
  )
}

export default Claim
