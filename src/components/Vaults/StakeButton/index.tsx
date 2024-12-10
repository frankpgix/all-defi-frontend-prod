import { FC } from 'react'

import { useToggle } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'

import { VaultDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import Modal from '@@/core/Modal'

import Stake from './Stake'

interface Props {
  data: VaultDetailProps[]
}

const StakeButton: FC<Props> = ({ data }) => {
  const [show, { setLeft, setRight }] = useToggle()
  // const isInStakeStatus = useMemo(() => [0, 1].includes(data.status), [data.status])
  const { account } = useProfile()

  return (
    <>
      <Button onClick={setRight} size="mini" disabled={Boolean(!account)}>
        Stake
      </Button>
      <Modal show={show} onClose={setLeft} title="Stake to Vault" width={1000}>
        <Stake {...{ data }} onClose={setLeft} />
      </Modal>
    </>
  )
}

export default StakeButton
