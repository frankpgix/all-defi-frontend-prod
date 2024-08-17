import { FC } from 'react'

import { useToggle } from 'ahooks'

import { VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

import Button from '@@/common/Button'
import Modal from '@@/core/Modal'

import Stake from './Stake'

interface Props {
  getData: () => void
  data: VaultDetailProps
  base: VaultBaseInfoProps
}

const StakeButton: FC<Props> = ({ getData, data, base }) => {
  const [show, { setLeft, setRight }] = useToggle()
  // const isInStakeStatus = useMemo(() => [0, 1].includes(data.status), [data.status])

  return (
    <>
      <Button onClick={setRight} size="mini">
        Stake
      </Button>
      <Modal show={show} onClose={setLeft} title="Stake to Vault" width={1000}>
        <Stake {...{ getData, data, base }} onClose={setLeft} />
      </Modal>
    </>
  )
}

export default StakeButton
