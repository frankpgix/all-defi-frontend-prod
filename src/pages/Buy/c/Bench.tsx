import React, { FC, useState, useMemo } from 'react'
import { useSigner } from 'wagmi'
import BN from 'bignumber.js'
import { isNumber } from 'lodash'
import { useRequest } from 'ahooks'

import { AllTokenUnit, AcUSDCUnit } from '@@/common/TokenUnit'

import { baseTokenOptions, tokenss } from '@/config/tokens'
import ACProtocol from '@/class/ACProtocol'
import AllProtocol from '@/class/AllProtocol'
import { useTokensData } from '@/store/tokens/hooks'
import { useAppDispatch } from '@/store'
import { getTokensBalanceAsync } from '@/store/tokens'
import { getUserStakesAsync } from '@/store/investor'
import { formatNumber } from '@/utils/tools'
// import { sleep } from '@/utils/tools'

import { Input, Select } from '@@/common/Form'
import Button from '@@/common/Button'
import BlueLineSection from '@@/web/BlueLineSection'
import InfoDialog from '@@/common/Dialog/Info'
import Popper from '@@/common/Popper'
import { notify } from '@@/common/Toast'

const usdcAddress = tokenss.USDC.tokenAddress
const ethAddress = tokenss.ETH.tokenAddress

const Bench: FC = () => {
  const { buyAllToken } = ACProtocol
  const { allTokenPrice } = AllProtocol
  const dispatch = useAppDispatch()
  const { balance } = useTokensData()
  const { data: signer } = useSigner()

  const [amount, setAmount] = useState<string | number>('')
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState(baseTokenOptions[0].value)
  const { data: allTPrice = 1 } = useRequest(async () => await allTokenPrice(baseTokenAddress), {
    refreshDeps: [baseTokenAddress]
  })
  // console.log(baseTokenAddress)
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
    if (signer) {
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await buyAllToken(baseTokenAddress, Number(amount), signer)
      if (status) {
        // 重新获取余额信息
        await dispatch(getTokensBalanceAsync(signer))
        // 重新拉取质押信息
        await dispatch(getUserStakesAsync(signer))
        setAmount(0)
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  const isDisabled = useMemo(() => !amount || !isNumber(Number(amount) || Number(amount) === 0), [amount])

  const maxNumber = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return Number(balance.USDC)
    if (baseTokenAddress === ethAddress) return Number(balance.ETH)
    return 0
  }, [balance.USDC, balance.ETH, baseTokenAddress])

  const onChangeBaseToken = (address: any) => {
    setBaseTokenAddress(String(address))
    setAmount('')
  }

  const currBaseTokenName = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return 'USDC'
    if (baseTokenAddress === ethAddress) return 'ETH'
    return ''
  }, [balance.USDC, balance.ETH, baseTokenAddress])

  return (
    <>
      <BlueLineSection title="Buy AC Token" className="web-buy-bench select">
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
              <p>USDC Balance: {balance.USDC}</p>
              <p>acUSDC Balance: {balance.acUSDC}</p>
            </>
          )}
          {baseTokenAddress === ethAddress && (
            <>
              <p>ETH Balance: {balance.ETH}</p>
              <p>acETH Balance: {balance.acETH}</p>
            </>
          )}

          <p>sALL Balance: {balance.sALL}</p>
        </Input>
        <Select value={baseTokenAddress} onChange={onChangeBaseToken} objOptions={baseTokenOptions} />
        <div className="web-buy-bench-arrow"></div>
        <div className="web-buy-bench-pre">
          <dl>
            <dt>You will receive</dt>
            <dd>
              <AcUSDCUnit name={currBaseTokenName} value={Number(amount) || 0}>
                ac{currBaseTokenName}
              </AcUSDCUnit>
            </dd>
          </dl>
          <dl>
            <dt>and extra</dt>
            <dd>
              <AllTokenUnit value={preAllValue} sall>
                sALL
                <Popper
                  size="default"
                  content="The above amount is based on the best estimate, the real amount is decided by the price when the smart contract is triggered"
                />
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
        onConfirm={buyAndStakeFunc}
        onClose={() => setInfoStatus(false)}
        title="Confirm Buy AC Token"
        msg={`You will purchase ${amount} ac${currBaseTokenName}, meanwhile you will recieve ${preAllValue} sALL, total cost of ${amount} ${currBaseTokenName}`}
      />
    </>
  )
}

export default Bench
