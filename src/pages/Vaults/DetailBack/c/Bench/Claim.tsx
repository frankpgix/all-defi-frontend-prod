import { FC, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import FundPool from '@/class/FundPool'
import { FundUserDataProps } from '@/class/help'
import tokens, { getTokenByAddress } from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import InfoDialog from '@@/common/Dialog/Info'

// import { notify } from '@@/common/Toast'
import { useNotify } from '@/hooks/useNotify'

interface Props {
  userData: FundUserDataProps
  getData: () => void
}

const Claim: FC<Props> = ({ userData, getData }) => {
  const { claim } = FundPool
  const { fundAddress } = useParams()
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const value = userData.unclaimedACToken
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const baseToken = useMemo(() => getTokenByAddress(userData.baseToken), [userData.baseToken])
  const acToken = useMemo(
    () => (baseToken.name === 'WETH' ? tokens.acETH : tokens[`ac${baseToken.name}`]),
    [baseToken]
  )

  // console.log(userData.baseToken, acToken, 33333)
  const onRedeem = async () => {
    if (signer && fundAddress) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim AC token' })
      // 执行购买和质押
      const { status, msg, hash } = await claim(fundAddress, signer)
      if (status) {
        await getData()
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Claim AC token', content: msg, hash })
      }
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
        <hr />
        <h4>Claim AC token</h4>
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
        title="Claim AC token"
        msg={`${userData.unclaimedACToken} acUSDC will be claimed`}
      />
    </>
  )
}

export default Claim
