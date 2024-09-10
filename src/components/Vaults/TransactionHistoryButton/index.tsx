import { FC } from 'react'

import { useToggle } from 'ahooks'

import Button from '@@/common/Button'
import Modal from '@@/core/Modal'

import History from './History'

const HistoryButton: FC = () => {
  const [show, { setLeft, setRight }] = useToggle()
  // const isInHistoryStatus = useMemo(() => [0, 1].includes(data.status), [data.status])

  return (
    <>
      <Button onClick={setRight} text>
        view transaction history
      </Button>
      <Modal show={show} onClose={setLeft} title="Transaction History" width={1000}>
        <History />
      </Modal>
    </>
  )
}

export default HistoryButton
