import { FC } from 'react'

import { useToggle } from 'ahooks'

import { VaultDetailProps, VaultUserDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import Modal from '@@/core/Modal'

import Claim from './Claim'
import UnStake from './UnStake'

interface Props {
  getData: () => void
  data: VaultDetailProps
  userData: VaultUserDetailProps
}

const StakeButton: FC<Props> = ({ getData, data, userData }) => {
  const [show, { setLeft, setRight }] = useToggle()

  return (
    <>
      <Button onClick={setRight} size="mini">
        UnStake & Claim
      </Button>
      <Modal show={show} onClose={setLeft} title="Unstake from Vault" width={1000}>
        <section className="c-vault-stake">
          <UnStake {...{ getData, data, userData }} onClose={setLeft} />
          <Claim {...{ getData, userData }} onClose={setLeft} />
        </section>
      </Modal>
    </>
  )
}

export default StakeButton
