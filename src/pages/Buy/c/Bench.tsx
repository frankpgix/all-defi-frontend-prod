import { FC, useMemo, useState } from 'react'

import BN from 'bignumber.js'
import { isNumber } from 'lodash'

import { useBuyAcToken } from '@/hooks/Contracts/useACProtocol'
import { useAllTokenPrice } from '@/hooks/Contracts/useAllProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useBaseTokenOptions, useToken } from '@/hooks/useToken'
import { useUserBalances } from '@/hooks/useToken'

import { AddressType } from '@/types/base'

import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Select } from '@@/common/Form'
import { AcUSDCUnit, AllTokenUnit } from '@@/common/TokenUnit'
import BlueLineSection from '@@/web/BlueLineSection'

const Bench: FC = () => {
  const { getTokenByName } = useToken()
  const baseTokenOptions = useBaseTokenOptions()
  const { buyAcToken } = useBuyAcToken()
  const { account } = useProfile()
  const { balances, refetch } = useUserBalances()
  const [amount, setAmount] = useState<string | number>('')
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(baseTokenOptions[0].value)
  const { data: allTPrice } = useAllTokenPrice(baseTokenAddress)
  const usdcAddress = getTokenByName('USDC').address
  const ethAddress = getTokenByName('ETH').address
  const preAllValue = useMemo(
    () =>
      Number(
        formatNumber(
          BN(Number(amount) || 0)
            .multipliedBy(0.1)
            .div(allTPrice > 0 ? allTPrice : 1)
            .toString(),
          4,
          '0.0000'
        )
      ),
    [amount, allTPrice]
  )

  const buyAndStakeFunc = async () => {
    if (account) {
      // 执行购买和质押
      await buyAcToken(baseTokenAddress, Number(amount), account, refetch)
    }
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
    setBaseTokenAddress(address)
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
