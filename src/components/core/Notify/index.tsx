import { FC, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

import classNames from 'classnames'
import { useAccount } from 'wagmi'

// import { useMount } from 'ahooks'
import { useNotify } from '@/hooks/useNotify'

import type { NotifyStoreItemType } from '@/types/notify'

// import NoData from '@@/common/NoData'
import { sleep } from '@/utils/tools'
import ALink from '@@/common/ALink'
import Button from '@@/common/Button'

export const Notify: FC = () => {
  return (
    <>
      <NotifyList />
    </>
  )
}

export const NotifyButton: FC = () => {
  const { notifyShow, openNotifyList, hasNotify } = useNotify()

  return (
    <div
      className={classNames('c-notify-button', { show: hasNotify && !notifyShow })}
      onClick={openNotifyList}
    ></div>
  )
}

export const NotifyList: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { notifyList, notifyShow: show, hasNotify, closeNotifyList, clearNotifyList } = useNotify()

  const onClear = async () => {
    const allClear = await clearNotifyList()
    if (allClear) {
      await sleep(100)
      closeNotifyList()
    }
  }

  return (
    <div
      ref={ref}
      className={classNames('c-notify-layout', { show: show && notifyList.length > 0 })}
    >
      <div className="c-notify-list">
        {notifyList.map((item) => (
          <NotifyItem data={item} key={`${item.id}`} />
        ))}
      </div>
      {/* <NoData show={!hasNotify} small tip="No Notify" white></NoData> */}
      {hasNotify && (
        <footer className="c-notify-footer">
          <Button size="mini" onClick={onClear}>
            Clear All
          </Button>
        </footer>
      )}
      {/* <button
        className={classNames('c-notify-btn-hide', { show })}
        onClick={closeNotifyList}
      ></button> */}
    </div>
  )
}

export const NotifyItem: FC<{ data: NotifyStoreItemType }> = ({ data }) => {
  const { chain } = useAccount()
  const { closeNotifyItem, notifyStatus } = useNotify()
  // const [animteType, setAnimteType] = useState('in')
  // const [layoutShow, setLayoutShow] = useState(false)

  const { layoutShow, animteType } = notifyStatus[data.id] ?? {
    animteType: 'in',
    layoutShow: true
  }

  const animateClass = useMemo(() => {
    if (animteType === 'in') {
      return 'animate__animated animate__bounceInRight'
    }
    if (animteType === 'out') {
      return 'animate__animated animate__bounceOutRight'
    }
  }, [animteType])

  // useMount(() => {
  //   setLayoutShow(true)
  // })

  const typeShow = useMemo(() => (data.type === 'loading' ? 'Pending' : data.type), [data.type])

  const onClose = async () => {
    // setAnimteType('out')
    // await sleep(200)
    // setLayoutShow(false)
    // await sleep(200)
    closeNotifyItem(data.id)
  }
  return (
    <div className={classNames('c-notify-item-layout', { show: layoutShow })}>
      <div className={classNames('c-notify-item', data.type, animateClass)}>
        <div className="c-notify-item-icon">
          <span />
        </div>
        <div className="c-notify-item-detail">
          <h3>{data.title || typeShow}</h3>
          {data.content && <p>{data.content}</p>}
          {data.hash && (
            <ALink to={`${chain?.blockExplorers?.default.url}/tx/${data.hash}`}>
              View on Explorers
            </ALink>
          )}
        </div>
        {data.type !== 'loading' && <div className="c-notify-item-close" onClick={onClose} />}
        {data.type === 'loading' ? (
          <div className="c-notify-item-line">
            <div className="c-notify-item-line-inner"></div>
          </div>
        ) : (
          <section className="c-notify-item-line">
            <section className="c-notify-item-line-inner"></section>
          </section>
        )}
      </div>
    </div>
  )
}

export default createPortal(<Notify />, document.body)
