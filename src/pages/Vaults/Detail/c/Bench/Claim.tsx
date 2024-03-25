import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useClaim } from '@/hooks/Contracts/useVault'
import { useToken } from '@/hooks/Tokens/useToken'
import { useProfile } from '@/hooks/useProfile'

import { VaultUserDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input } from '@@/common/Form'
import { AcUSDCUnit } from '@@/common/TokenUnit'

interface Props {
  userData: VaultUserDetailProps
  getData: () => void
}

const Claim: FC<Props> = ({ userData, getData }) => {
  const { getTokenByName } = useToken()
  const { onClaim } = useClaim(userData.address)
  const { fundAddress } = useParams()
  const { account } = useProfile()

  const value = userData.unclaimedACToken
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const baseToken = useMemo(() => userData.underlyingToken, [userData.underlyingToken])
  const acToken = useMemo(
    () => getTokenByName(baseToken.name === 'WETH' ? 'acETH' : `ac${baseToken.name}`),
    [baseToken]
  )

  const onRedeem = async () => {
    if (account && fundAddress) {
      await onClaim(account)
      getData()
    }
  }

  return (
    <>
      <section className="web-fund-detail-bench">
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
