import { FC, ReactNode, useMemo } from 'react'
import BN from 'bignumber.js'
import { useToggle } from 'ahooks'

import FundPool from '@/class/FundPool'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import Button, { ButtonProps } from '@@/common/Button'

import Dialog from '@@/common/Dialog/Info'
import { FundDetailProps } from '@/class/help'

// import { notify } from '@@/common/Toast'

interface Props extends ButtonProps {
  children: ReactNode
  fundAddress?: string
  callback?: () => void
  data: FundDetailProps
}

const FundSettleButton: FC<Props> = ({
  fundAddress,
  children,
  outline,
  size,
  disabled,
  callback,
  data
}) => {
  const { settleAccount } = FundPool
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const [show, { setLeft: closeModal, setRight: openModal }] = useToggle()
  const [show2, { setLeft: closeModal2, setRight: openModal2 }] = useToggle()
  const [show3, { setLeft: closeModal3, setRight: openModal3 }] = useToggle()

  const nextRoundCash = useMemo(() => {
    let temp = BN(data.redeemingShares).times(data.sharePrice)
    if (data.epochIndex % 6 === 0) {
      temp = temp.plus(data.platFee).plus(data.managerFee)
    }
    const v = Number(temp.minus(data.subscribingACToken).toFixed(2, BN.ROUND_UP))
    return v >= 0 ? v : 0
  }, [
    data.redeemingShares,
    data.sharePrice,
    data.subscribingACToken,
    data.epochIndex,
    data.platFee,
    data.managerFee
  ])

  // 下轮赎回减去下轮申购减去FEE ？？ 大于现金余额
  const isShowCashBalanceLess = useMemo(
    () =>
      BN(nextRoundCash).minus(data.subscribingACToken).toNumber() > BN(data.unusedAsset).toNumber(),
    [nextRoundCash, data.subscribingACToken, data.unusedAsset]
  )

  // 是否还有申购余额
  const isCannotAllocate = useMemo(
    () => BN(data.realtimeAUMLimit).minus(data.aum).minus(data.subscribingACToken).toNumber() <= 0,
    [data.realtimeAUMLimit, data.aum, data.subscribingACToken]
  )

  // console.log('data', data)

  const onButtonClick = () => {
    if (isShowCashBalanceLess && isCannotAllocate) {
      openModal3()
      return
    }
    if (isShowCashBalanceLess) {
      openModal()
      return
    }
    if (isCannotAllocate) {
      openModal2()
      return
    }

    onSettle()
  }
  const onSettle = async () => {
    closeModal()
    closeModal2()
    closeModal3()
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
      <Button outline={outline} disabled={disabled} size={size} onClick={onButtonClick}>
        {children}
      </Button>
      <Dialog
        show={show}
        type="fail"
        title="Please confirm whether you want to settle"
        onClose={closeModal}
        msg="Current cash balances cannot cover all withholding requests and forced settlement will result in losses"
        confirmText="cancel"
        cancelText="confirm"
        onConfirm={closeModal}
        onCancel={onSettle}
      />
      <Dialog
        show={show3}
        type="fail"
        title="Please confirm whether you want to settle"
        onClose={closeModal3}
        msg="Current cash balances cannot cover all withholding requests and forced settlement will result in losses"
        confirmText="cancel"
        cancelText="next"
        onConfirm={closeModal3}
        onCancel={openModal2}
      />
      <Dialog
        show={show2}
        type="fail"
        title="Please confirm whether you want to settle"
        onClose={closeModal2}
        msg="Please stake more ALL Token before end of current Epoch to sure to receive 100% of the incentive fee during settlement."
        confirmText="cancel"
        cancelText="confirm"
        onConfirm={closeModal2}
        onCancel={onSettle}
      />
    </>
  )
}

export default FundSettleButton
