import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { isNumber } from 'lodash'
// import { useRequest } from 'ahooks'

import { AllTokenUnit, AcUSDCUnit } from '@@/common/TokenUnit'
// import contracts from '@/config/contracts'
import { baseTokenOptions, tokens } from '@/config/tokens'
// import ACProtocol from '@/class/ACProtocol'
// import AllProtocol from '@/class/AllProtocol'
// import { useTokensData } from '@/store/tokens/hooks'
// import { useAppDispatch } from '@/store'
// import { getTokensBalanceAsync } from '@/store/tokens'
// import { getUserStakesAsync } from '@/store/investor'
import { formatNumber } from '@/utils/tools'
// import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'
import { useUserBalances } from '@/hooks/useProfile'
import { useAllTokenPrice } from '@/hooks/useAllProtocol'

import { sleep } from '@/utils/tools'
import { AddressType } from '@/types/base'

import { Input, Select } from '@@/common/Form'
import Button from '@@/common/Button'
import BlueLineSection from '@@/web/BlueLineSection'
import InfoDialog from '@@/common/Dialog/Info'
// import Popper from '@@/common/Popper'
// import { notify } from '@@/common/Toast'

const usdcAddress = tokens.USDC.address
const ethAddress = tokens.ETH.address
const Bench: FC = () => {
  // const { buyAllToken } = ACProtocol
  // const { allTokenPrice } = AllProtocol
  // const dispatch = useAppDispatch()
  // const { balance } = useTokensData()
  // const { signer } = useProfile()
  // const { createNotify, updateNotifyItem } = useNotify()
  const balances = useUserBalances()
  const [amount, setAmount] = useState<string | number>('')
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(baseTokenOptions[0].value)
  const { data: allTPrice } = useAllTokenPrice(baseTokenAddress)

  const preAllValue = useMemo(
    () =>
      Number(
        formatNumber(
          BN(Number(amount) || 0)
            .multipliedBy(0.1)
            .div(allTPrice)
            .toString(),
          4,
          '0.0000'
        )
      ),
    [amount, allTPrice]
  )

  const buyAndStakeFunc = async () => {
    // if (signer) {
    //   const notifyId = await createNotify({ content: 'Buy AC Token', type: 'loading' })
    //   // 执行购买和质押
    //   const { status, msg, hash } = await buyAllToken(baseTokenAddress, Number(amount), signer)
    //   console.log(status, msg, hash, notifyId)
    //   if (status) {
    //     // 重新获取余额信息
    //     await dispatch(getTokensBalanceAsync(signer))
    //     // 重新拉取质押信息
    //     await dispatch(getUserStakesAsync(signer))
    //     setAmount('')
    //     // await closeNotifyItem(notifyId)
    //     updateNotifyItem(notifyId, { content: 'Buy AC Token', type: 'success', hash })
    //     // notify.update(notifyId, 'success')
    //   } else {
    //     await sleep(200)
    //     // await closeNotifyItem(notifyId)
    //     updateNotifyItem(notifyId, {
    //       title: 'Buy All Token',
    //       type: 'error',
    //       content: msg,
    //       hash
    //     })
    //     // notify.update(notifyId, 'error', msg)
    //   }
    // }
  }

  const isDisabled = useMemo(
    () => !amount || !isNumber(Number(amount) || Number(amount) === 0),
    [amount]
  )

  const maxNumber = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return Number(balances.USDC)
    if (baseTokenAddress === ethAddress) return Number(balances.ETH)
    return 0
  }, [balances.USDC, balances.ETH, baseTokenAddress])

  const onChangeBaseToken = (address: any) => {
    setBaseTokenAddress(String(address))
    setAmount('')
  }

  const currBaseTokenName = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return 'USDC'
    if (baseTokenAddress === ethAddress) return 'ETH'
    return ''
  }, [balances.USDC, balances.ETH, baseTokenAddress])

  return (
    <>
      <BlueLineSection title="Contribution" className="web-buy-bench select">
        <Input
          className="web-buy-bench-input"
          type="number"
          value={amount}
          onChange={(val) => setAmount(val)}
          right
          placeholder="0"
          maxNumber={maxNumber}
          error={Number(amount) === 0 && amount !== ''}
        >
          {baseTokenAddress === usdcAddress && (
            <>
              <p>USDC Balance: {balances.USDC}</p>
              <p>acUSDC Balance: {balances.acUSDC}</p>
            </>
          )}
          {baseTokenAddress === ethAddress && (
            <>
              <p>ETH Balance: {balances.ETH}</p>
              <p>acETH Balance: {balances.acETH}</p>
            </>
          )}

          <p>sALL Balance: {balances.sALLTOKEN}</p>
        </Input>
        <Select
          value={baseTokenAddress}
          onChange={onChangeBaseToken}
          objOptions={baseTokenOptions}
        />
        <div className="web-buy-bench-arrow"></div>
        <div className="web-buy-bench-pre">
          <dl>
            <dt>You will receive</dt>
            <dd>
              <AcUSDCUnit name={`ac${currBaseTokenName}`} value={Number(amount) || 0}>
                ac{currBaseTokenName}
              </AcUSDCUnit>
            </dd>
          </dl>
          <dl>
            <dt>and an extra</dt>
            <dd>
              <AllTokenUnit value={preAllValue} sall>
                sALL
              </AllTokenUnit>
            </dd>
          </dl>
          <Button disabled={isDisabled} onClick={() => setInfoStatus(true)}>
            confirm
          </Button>
        </div>
      </BlueLineSection>
      <InfoDialog
        show={infoStatus}
        type="info"
        onConfirm={buyAndStakeFunc}
        onClose={() => setInfoStatus(false)}
        title="Confirm AC Token Purchase"
        msg={`You will purchase ${amount} ac${currBaseTokenName}, and you will also recieve ${preAllValue} sALL token, for a total cost of ${amount} ${currBaseTokenName}`}
      />
    </>
  )
}

export default Bench
