import React, { FC, useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import BN from 'bignumber.js'
import { isNumber } from 'lodash'

import { AllTokenUnit, AcUSDCUnit } from '@@/common/TokenUnit'

import { baseTokenOptions, tokens, ZERO_ADDRESS } from '@/config/tokens'

import { formatNumber, sleep } from '@/utils/tools'
import { useAllTokenPrice } from '@/hooks/useAllProtocol'
import { useNotify } from '@/hooks/useNotify'
import { useBuyAcToken, useEthBuyAcToken } from '@/hooks/useACProtocol'
import { useStoreBalances } from '@/store/useProfile'
import { useUserACBuyData } from '@/graphql/useFundData'

import { Input, Select } from '@@/form'
import Button from '@@/common/Button'
import BlueLineSection from '@@/web/BlueLineSection'
import InfoDialog from '@@/common/Dialog/Info'
import Popper from '@@/common/Popper'

const usdcAddress = tokens.USDC.address
const ethAddress = tokens.ETH.address

const Bench: FC = () => {
  const { address: account, isConnected } = useAccount()
  const { refetch } = useUserACBuyData(account ?? '')

  const balances = useStoreBalances((state: any) => state.balances)
  const { notifyLoading, notifySuccess, notifyError } = useNotify()
  //
  const [amount, setAmount] = useState<string | number>('')
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState(baseTokenOptions[0].value)
  const { data: allTPrice = 1 } = useAllTokenPrice(baseTokenAddress)

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

  const onSettled = async (data: any, error: any) => {
    if (error) {
      notifyError(error)
    } else {
      notifySuccess()
      await sleep(10000)
      setAmount('')
      refetch()
    }
  }

  const { onBuyAcToken, isLoading } = useBuyAcToken(onSettled)
  const { onEthBuyAcToken, isLoading: ethIsLoading } = useEthBuyAcToken(onSettled)

  const buyAndStakeFunc = async () => {
    if (isConnected) {
      notifyLoading()
      if (baseTokenAddress === ZERO_ADDRESS) {
        await onEthBuyAcToken(amount)
      } else {
        await onBuyAcToken(baseTokenAddress, amount)
      }
    }
  }

  //
  const isDisabled = useMemo(
    () => !amount || !isNumber(Number(amount) || Number(amount) === 0) || isLoading || ethIsLoading,
    [amount, ethIsLoading, isLoading]
  )
  //
  const maxNumber = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return Number(balances.USDC)
    if (baseTokenAddress === ethAddress) return Number(balances.ETH)
    return 0
  }, [balances.USDC, balances.ETH, baseTokenAddress])
  //
  const onChangeBaseToken = (address: any) => {
    setBaseTokenAddress(String(address))
    setAmount('')
  }
  //
  const currBaseTokenName = useMemo(() => {
    if (baseTokenAddress === usdcAddress) return 'USDC'
    if (baseTokenAddress === ethAddress) return 'ETH'
    return ''
  }, [baseTokenAddress])

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
