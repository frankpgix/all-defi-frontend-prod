import React, { FC, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { useMount } from 'ahooks'
import { useNotify } from '@/hooks/useNotify'
import type { NotifyStoreItemType } from '@/types/notify'
import ALink from '@@/common/ALink'
// import Button from '@@/common/Button'
import NoData from '@@/common/NoData'
import { ETH_SCAN_URL } from '@/config'
import { sleep } from '@/utils/tools'
export const Notify: FC = () => {
  return (
    <>
      <NotifyButton />
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
    const allClear = clearNotifyList()
    if (allClear) {
      await sleep(100)
      closeNotifyList()
    }
  }

  return (
    <div ref={ref} className={classNames('c-notify-layout', { show })}>
      <div className="c-notify-list">
        {notifyList.map((item) => (
          <NotifyItem data={item} key={item.id} />
        ))}
      </div>
      <NoData show={!hasNotify} small tip="No Notify" white></NoData>
      {hasNotify && (
        <footer className="c-notify-footer">
          <button className="c-notify-btn-clear" onClick={onClear}>
            Clear All
          </button>
        </footer>
      )}
      <button
        className={classNames('c-notify-btn-hide', { show })}
        onClick={closeNotifyList}
      ></button>
    </div>
  )
}

export const NotifyItem: FC<{ data: NotifyStoreItemType }> = ({ data }) => {
  const { closeNotifyItem } = useNotify()
  const [animteType, setAnimteType] = useState('in')
  const [layoutShow, setLayoutShow] = useState(false)

  const animateClass = useMemo(() => {
    if (animteType === 'in') {
      return 'animate__animated animate__bounceInRight'
    }
    if (animteType === 'out') {
      return 'animate__animated animate__bounceOutRight'
    }
  }, [animteType])

  useMount(() => {
    setLayoutShow(true)
  })

  const onClose = async () => {
    setAnimteType('out')
    await sleep(200)
    setLayoutShow(false)
    await sleep(200)
    closeNotifyItem(data.id)
  }
  return (
    <div className={classNames('c-notify-item-layout', { show: layoutShow })}>
      <div className={classNames('c-notify-item', data.type, animateClass)}>
        <div className="c-notify-item-icon">
          <span />
        </div>
        <div className="c-notify-item-detail">
          {data.title && <h3>{data.title}</h3>}
          {data.content && <p>{data.content}</p>}
          {data.hash && <ALink to={`${ETH_SCAN_URL}/tx/${data.hash}`}>View on Arbitrumscan</ALink>}
        </div>
        {data.type !== 'loading' && (
          <div className="c-notify-item-close" onClick={onClose}>
            <svg aria-hidden="true" viewBox="0 0 14 16">
              <path
                fill-rule="evenodd"
                d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default createPortal(<Notify />, document.body)
