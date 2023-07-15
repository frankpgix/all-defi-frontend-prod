import React, { FC, ReactNode } from 'react'

import FundPool from '@/class/FundPool'
import { useProfile } from '@/hooks/useProfile'

import Button, { ButtonProps } from '@@/common/Button'

import { notify } from '@@/common/Toast'

interface Props extends ButtonProps {
  children: ReactNode
  fundAddress?: string
  callback?: () => void
}

const FundSettleButton: FC<Props> = ({ fundAddress, children, outline, size, disabled, callback }) => {
  const { settleAccount } = FundPool
  const { signer } = useProfile()

  const onSettle = async () => {
    if (signer && fundAddress) {
      const notifyId = notify.loading()
      const { status, msg } = await settleAccount(fundAddress, signer)
      if (status) {
        if (callback) await callback()
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  return (
    <>
      <Button outline={outline} disabled={disabled} size={size} onClick={onSettle}>
        {children}
      </Button>
    </>
  )
}

export default FundSettleButton
