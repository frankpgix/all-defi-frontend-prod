import { FC } from 'react'
import Button from '@@/common/Button'
import { toast, notify } from '@@/common/Toast'

import { sleep } from '@/utils/tools'
const Test: FC = () => {
  const toastTest = () => {
    console.log(toast)
    toast('test')
    toast.success('test', 50000)
    toast.warning('test', 50000)
    toast.error('test', 50000)
  }
  const toastLoadingTest = () => {
    toast.loading('loading')
  }
  const notifyTest = () => {
    console.log(notify)
    notify(
      <>
        您 <span>2,000 USDT</span> 的提现已经成功。
      </>,
      100000
    )
    notify.success(
      <>
        您 <strong>2,000 USDT</strong> 的提现已经成功。
      </>,
      100000
    )
    notify.warning(
      <>
        您 <em>2,000 USDT</em> 的提现已经成功。
      </>,
      100000
    )
    notify.error('您的订单提交失败，请稍后再试。', 100000)
  }

  const promiseTest = async () => {
    await notify.promise(sleep(10000000))
    console.log(11111)
  }

  const customPromiseTest = async () => {
    await notify.promise(sleep(10000), {
      pendingMsg: '等待合约执行',
      successMsg: '合约执行成功',
      errorMsg: '合约执行失败'
    })
    console.log(222222)
  }
  const testSleep = async () => {
    await sleep(3000)
    return '模拟返回成功信息'
  }
  const customComponentPromiseTest = async () => {
    await notify.promise(testSleep, {
      onSuccess: (data) => data
    })
    console.log(3333)
  }

  const notifyUpdate = async () => {
    const notifyId = notify.loading()
    await sleep(3000)
    const res = Math.random() > 0.5
    const type = res ? 'success' : 'error'
    const msg = res ? '' : '返回的报错信息'
    notify.update(notifyId, type, msg)
  }
  return (
    <div className="modals">
      <h1>Toasts</h1>
      <div>
        <Button onClick={toastTest}>toast test</Button>
        <Button onClick={toastLoadingTest}>toast loading test</Button>
        <Button onClick={() => toast.clear()}>clear toast</Button>
        <Button onClick={notifyTest}>notify test</Button>
        <Button onClick={promiseTest}>simple promise test</Button>
        <Button onClick={customPromiseTest}>custom message promise test</Button>
        <Button onClick={customComponentPromiseTest}>custom component promise test</Button>
        <Button onClick={notifyUpdate}>notify update</Button>
      </div>
    </div>
  )
}

export default Test
