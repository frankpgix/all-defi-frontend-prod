import { FC, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useBoolean } from 'ahooks'

import { useClaim } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'

import { VaultUserDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input } from '@@/common/Form'
import { AcUSDCUnit } from '@@/common/TokenUnit'

interface Props {
  userData: VaultUserDetailProps
  getData: () => void
  onClose: () => void
}

const Claim: FC<Props> = ({ userData, getData, onClose }) => {
  const { onClaim } = useClaim(userData.address)
  const { fundAddress } = useParams()
  const { account } = useProfile()

  const [submiting, { toggle: toggleSubmiting }] = useBoolean(false)
  const value = userData.unclaimedUnderlying
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const acToken = useMemo(() => userData.underlying, [userData.underlying])

  const onRedeem = async () => {
    if (account && fundAddress) {
      toggleSubmiting()
      await onClaim(account)
      getData()
      onClose()
      toggleSubmiting()
    }
  }

  return (
    <>
      <h4>Claim</h4>
      <div className="c-vault-stake-input">
        <Input
          value={value}
          disabled={value <= 0}
          readonly={value > 0}
          onChange={() => null}
          type="number"
          suffix={<AcUSDCUnit name={acToken.name} />}
          right
        />
      </div>
      <div className="c-vault-stake-action">
        <Button onClick={onRedeem} disabled={value <= 0 || submiting}>
          confirm
        </Button>
      </div>
      <InfoDialog
        show={infoStatus}
        onConfirm={onRedeem}
        onClose={() => setInfoStatus(false)}
        title="Claim"
        msg={`${userData.unclaimedUnderlying} ${userData.underlying.name} will be claimed`}
      />
    </>
  )
}

export default Claim
