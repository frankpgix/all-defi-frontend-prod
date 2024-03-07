import { FC, useState, useCallback } from 'react'
import classNames from 'classnames'
import { sleep, copyText } from '@/utils/tools'

// import Image from '@/components/common/Image'

interface Props {
  text: string
}

const CopyText: FC<Props> = ({ text }) => {
  const [status, setStatus] = useState<boolean>(false)
  const onCopy = useCallback(async () => {
    await copyText(text)
    setStatus(true)
    await sleep(1500)
    setStatus(false)
  }, [text])
  return (
    <div className={classNames('web-c-copytext', { show: status })} onClick={onCopy}>
      <span>Copied</span>
    </div>
  )
}

export default CopyText
