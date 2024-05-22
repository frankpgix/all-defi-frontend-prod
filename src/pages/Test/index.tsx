import { FC, useState } from 'react'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import FundIcon from '@@/common/FundIcon'
import ComingSoon from '@@/common/Dialog/ComingSoon'
import { useNotify } from '@/hooks/useNotify'
import Toasts from './Toasts'
import { sleep } from '@/utils/tools'

import { useTools } from './useTools'

const Test: FC = () => {
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)
  const { createNotify, updateNotifyItem } = useNotify()
  const upLoadingNotify = async () => {
    console.log(111)
    const id = await createNotify({
      type: 'loading',
      content: '等待变成成功'
    })
    console.log(id)
    await sleep(5000)
    console.log(id)
    updateNotifyItem(id, {
      type: 'success',
      content: '成功的消息',
      hash: '0x4751a349bd7af09de1b54eabc087e72cb8a78406bbcd67ea1d8bcea059255e2c'
    })
  }
  useTools()

  return (
    <div className="web-home">
      <Button onClick={() => createNotify({ type: 'success', content: '创建一个消息成功了' })}>
        创建消息
      </Button>
      <Button
        onClick={() =>
          createNotify({ type: 'success', title: '这是一个标题', content: '创建带标题的消息' })
        }
      >
        创建带标题的消息
      </Button>
      <Button
        onClick={() =>
          createNotify({ type: 'warning', title: '这是一个标题', content: '创建警告的消息' })
        }
      >
        创建警告的消息
      </Button>
      <Button
        onClick={() =>
          createNotify({ type: 'error', title: '这是一个标题', content: '创建错误的消息' })
        }
      >
        创建错误的消息
      </Button>
      <Button
        onClick={() =>
          createNotify({
            type: 'loading',
            content: '创建Loding的消息',
            hash: '0x4751a349bd7af09de1b54eabc087e72cb8a78406bbcd67ea1d8bcea059255e2c'
          })
        }
      >
        创建Loding的消息
      </Button>
      <Button onClick={upLoadingNotify}>创建一个更新的Loding的消息</Button>
      <Toasts />
      <Input type="number" value={name} onChange={(val) => setName(val)} right></Input>
      <Button disabled>222</Button>
      <Button onClick={() => setShow(!show)}>Open Wait Modal</Button>
      <Button text>222</Button>
      <ComingSoon show={show} onClose={() => setShow(false)} />
      <FundIcon name="A" />
      <FundIcon name="B" round />
      <FundIcon name="C" size="mini" />
      <FundIcon name="D" size="large" />
      <FundIcon name="E" size="medium" />
      <FundIcon name="f" />
      <FundIcon name="g" />
      <FundIcon name="h" />
      <FundIcon name="i" />
      <FundIcon name="j" />
      <FundIcon name="k" />
      <FundIcon name="l" />
      <FundIcon name="m" />
      <FundIcon name="n" />
      <FundIcon name="o" />
      <FundIcon name="p" />
      <FundIcon name="q" />
      <FundIcon name="r" />
      <FundIcon name="s" />
      <FundIcon name="t" />
      <FundIcon name="u" />
      <FundIcon name="v" />
      <FundIcon name="w" />
      <FundIcon name="x" />
      <FundIcon name="y" />
      <FundIcon name="z" />
      <FundIcon name="0" />
      <FundIcon name="1" />
      <FundIcon name="2" />
      <FundIcon name="3" />
      <FundIcon name="4" />
      <FundIcon name="5" />
      <FundIcon name="6" />
      <FundIcon name="7" />
      <FundIcon name="8" />
      <FundIcon name="9" />
    </div>
  )
}

export default Test
