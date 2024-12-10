import { FC, useMemo, useState } from 'react'

import { useToggle } from 'ahooks'

import { useVaultDetails } from '@/hooks/Contracts/useVaultDetails'
import { useProfile } from '@/hooks/useProfile'

import { VaultDetailProps } from '@/types/vault'

import { DropdownSelectItemProps } from '@/components/core/Dropdown'
import Button from '@@/common/Button'
import Modal from '@@/core/Modal'

import Claim from './Claim'
import UnStake from './UnStake'

interface Props {
  data: VaultDetailProps[]
}

const StakeButton: FC<Props> = ({ data: list }) => {
  const { account } = useProfile()
  const [show, { setLeft, setRight }] = useToggle()

  const underlyingTokenOptions = useMemo(() => {
    return list.map(({ underlyingToken: { name, address, icon } }) => ({
      label: name,
      value: address,
      icon
    }))
  }, [list])

  const [currentToken, setCurrentToken] = useState<DropdownSelectItemProps>(
    underlyingTokenOptions[0]
  )

  const data = useMemo(
    () => list.find((item) => item.underlyingToken.address === currentToken.value) ?? list[0],
    [list, currentToken.value]
  )
  const {
    data: { vaultUserDetail: userData },
    refetch: getData
  } = useVaultDetails(data.address, account ?? '0x')

  return (
    <>
      <Button onClick={setRight} size="mini" disabled={Boolean(!account)}>
        UnStake & Claim
      </Button>
      <Modal show={show} onClose={setLeft} title="Unstake from Vault" width={1000}>
        <section className="c-vault-stake">
          <UnStake
            {...{ getData, data, userData, currentToken, setCurrentToken, underlyingTokenOptions }}
            onClose={setLeft}
          />
          <Claim {...{ getData, userData }} onClose={setLeft} />
        </section>
      </Modal>
    </>
  )
}

export default StakeButton
