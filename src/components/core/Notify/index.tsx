import React, { FC, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
// import { useClickAway } from 'ahooks'
import { useNotify } from '@/hooks/useNotify'
import type { NotifyStoreItemType } from '@/types/notify'
import ALink from '@/components/common/ALink'
import { ETH_SCAN_URL } from '@/config'

export const Notify: FC = () => {
  return (
    <>
      <NotifyButton />
      <NotifyList />
    </>
  )
}

export const NotifyButton: FC = () => {
  const { notifyList, notifyShow, openNotifyList } = useNotify()

  const show = useMemo(() => {
    return notifyList.length > 0 && notifyShow === false
  }, [notifyList.length, notifyShow])

  return <div className={classNames('c-notify-button', { show })} onClick={openNotifyList}></div>
}

export const NotifyList: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { notifyList, notifyShow, closeNotifyList } = useNotify()
  // useClickAway((e: Event) => {
  //   // @ts-ignore
  //   const isOpenButton = e.target?.classList.value.includes('c-notify-button')
  //   if (notifyShow && !isOpenButton) closeNotifyList()
  //   console.log(111111)
  // }, ref)
  // console.log(notifyShow)
  return (
    <div ref={ref} className={classNames('c-notify-layout', { show: notifyShow })}>
      <div className="c-notify-list">
        {notifyList.map((item) => (
          <NotifyItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export const NotifyItem: FC<{ data: NotifyStoreItemType }> = ({ data }) => {
  const { closeNotifyItem } = useNotify()
  return (
    <div className={classNames('c-notify-item', data.type)}>
      <div className="c-notify-item-icon">
        <span />
      </div>
      <div className="c-notify-item-detail">
        {data.title && <h3>{data.title}</h3>}
        {data.content && <p>{data.content}</p>}
        {data.hash && <ALink to={`${ETH_SCAN_URL}/tx/${data.hash}`}>View on Arbitrumscan</ALink>}
      </div>
      <div className="c-notify-item-close" onClick={() => closeNotifyItem(data.id)}>
        关闭
      </div>
    </div>
  )
}

export default createPortal(<Notify />, document.body)
