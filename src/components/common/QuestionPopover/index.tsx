import { FC, useState, useRef, useMemo } from 'react'
import { useClickAway } from 'ahooks'
import classNames from 'classnames'

import { getMaxZIndex } from '@/utils/tools'
import Image from '@/components/common/Image'

interface Props {
  text: string
  size?: string
}

const QuestionPopover: FC<Props> = ({ text, size }) => {
  const ref = useRef(null)
  const [show, setShow] = useState<boolean>(false)
  useClickAway(() => setShow(false), ref)

  const zIndexStyle = useMemo(() => {
    if (show) return { zIndex: getMaxZIndex() + 1 }
    return {}
  }, [show])

  return (
    <div
      className={classNames('web-question-popover', `web-question-popover-size-${size}`)}
      ref={ref}
    >
      <Image src="icon/question.svg" onClick={() => setShow(!show)} />
      {show && (
        <div className="web-question-popover-text" style={zIndexStyle}>
          {text}
        </div>
      )}
    </div>
  )
}

QuestionPopover.defaultProps = {
  text: '',
  size: 'default'
}

export default QuestionPopover
