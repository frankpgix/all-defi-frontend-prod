import { FC, useMemo, useState } from 'react'

import { isNumber } from 'lodash'

import { useDeposit } from '@/hooks/Contracts/useACProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useChainToken, useToken, useUnderlyingTokenOptions } from '@/hooks/useToken'
import { useUserBalances } from '@/hooks/useToken'

import { AddressType } from '@/types/base'

import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Select } from '@@/common/Form'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import BlueLineSection from '@@/web/BlueLineSection'

const Bench: FC = () => {
  const { getTokenByName } = useToken()
  const { chainToken } = useChainToken()
  const baseTokenOptions = useUnderlyingTokenOptions()
  const { onDeposit } = useDeposit()
  const { account } = useProfile()
  const { balances, refetch } = useUserBalances()
  const [amount, setAmount] = useState<string | number>('')
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(baseTokenOptions[0].value)
  const usdcAddress = getTokenByName('USDC').address
  const wbtcAddress = getTokenByName('WBTC').address
  const chainTokenAddress = chainToken.address

  const buyAndStakeFunc = async () => {
    if (account) {
      // 执行购买和质押
      await onDeposit(baseTokenAddress, Number(amount), 30 * 24 * 60 * 60, account, refetch)
    }
  }

  const isDisabled = useMemo(
    () => !amount || !isNumber(Number(amount) || Number(amount) === 0),
    [amount]
  )

  const maxNumber = useMemo(() => {
    if (baseTokenAddress === wbtcAddress) return Number(balances.WBTC)
    if (baseTokenAddress === usdcAddress) return Number(balances.USDC)
    if (baseTokenAddress === chainTokenAddress) return Number(balances[chainToken.name])
    return 0
  }, [balances.USDC, balances[chainToken.name], baseTokenAddress])

  const onChangeBaseToken = (address: any) => {
    setBaseTokenAddress(address)
    setAmount('')
  }

  const currBaseTokenName = useMemo(() => {
    if (baseTokenAddress === wbtcAddress) return 'WBTC'
    if (baseTokenAddress === usdcAddress) return 'USDC'
    if (baseTokenAddress === chainTokenAddress) return chainToken.name
    return ''
  }, [balances.USDC, balances[chainToken.name], baseTokenAddress])

  return (
    <>
      <BlueLineSection title="Deposit" className="web-buy-bench select">
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
          {baseTokenAddress === wbtcAddress && (
            <>
              <p>WBTC Balance: {balances.WBTC}</p>
              <p>acBTC Balance: {balances.acBTC}</p>
            </>
          )}
          {baseTokenAddress === usdcAddress && (
            <>
              <p>USDC Balance: {balances.USDC}</p>
              <p>acUSDC Balance: {balances.acUSDC}</p>
            </>
          )}
          {baseTokenAddress === chainTokenAddress && (
            <>
              <p>
                {chainToken.name} Balance: {balances[chainToken.name]}
              </p>
              <p>
                ac{chainToken.name} Balance: {balances[`ac${chainToken.name}`]}
              </p>
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
            <dd></dd>
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
        msg={`You will purchase ${amount} ac${currBaseTokenName},  for a total cost of ${amount} ${currBaseTokenName}`}
      />
    </>
  )
}

export default Bench
