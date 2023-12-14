import React, { FC, ReactNode } from 'react'

import FundPool from '@/class/FundPool'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import Button, { ButtonProps } from '@@/common/Button'

// import { notify } from '@@/common/Toast'

interface Props extends ButtonProps {
  children: ReactNode
  fundAddress?: string
  callback?: () => void
}

const FundSettleButton: FC<Props> = ({
  fundAddress,
  children,
  outline,
  size,
  disabled,
  callback
}) => {
  const { settleAccount } = FundPool
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const onSettle = async () => {
    if (signer && fundAddress) {
      const notifyId = await createNotify({ type: 'loading', content: 'Settle Vault' })
      const { status, msg, hash } = await settleAccount(fundAddress, signer)
      if (status) {
        if (callback) await callback()
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Settle Vault', content: msg, hash })
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
