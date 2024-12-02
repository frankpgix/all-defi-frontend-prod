import { FC, useMemo, useState } from 'react'

import BN from 'bignumber.js'
import classNames from 'classnames'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useVaultList } from '@/hooks/Contracts/useVaultReader'

import { VaultDetailProps } from '@/types/vault'

import { formatNumber } from '@/utils/tools'
import StakeButton from '@@/Vaults/StakeButton'
import Button from '@@/common/Button'
import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'
import { FlexBox } from '@@/core/Box'
import Tag from '@@/core/Tag'
import { VaultName } from '@@/core/VaultName'

// import { VaultName } from '@@/common/T'

const VaultList: FC = () => {
  const [rollStatus, setRollStatus] = useState<boolean[]>([true])
  const onRollChange = (index: number) => {
    const temp = [...rollStatus]
    temp[index] = !temp[index]
    setRollStatus(temp)
  }

  const { data, isLoading } = useVaultList()
  console.log(data)
  if (isLoading || data.length === 0) return null
  return (
    <div className="p-vault-list">
      <header className="p-vault-list-header">
        <h2>Vaults</h2>
      </header>
      <main className="table">
        <header className="table-header">
          <strong>Name</strong>
          <strong>Asset Under Management</strong>
          <strong>Current Epoch return %</strong>
          <strong>Epoch</strong>
          <strong>Active</strong>
        </header>
        <section className="table-body">
          {[1].map((_, index) => (
            <VaultGroup
              key={index}
              rollIndex={index}
              show={rollStatus[index]}
              onRollChange={onRollChange}
              list={data}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
export default VaultList

interface VaultGroupProps {
  onRollChange: (index: number) => void
  show: boolean
  rollIndex: number
  list: VaultDetailProps[]
}

const VaultGroup: FC<VaultGroupProps> = ({ onRollChange, show, rollIndex, list }) => {
  const assetTokenList = useMemo(() => list.map((item) => item.underlyingToken), [list])
  // const { data: price } = useAssetLatestPrices(assetTokenList, list[0]?.epochStartBlock)
  const { data: price } = useAssetLatestPrices(assetTokenList)
  console.log(price, 'price')
  const totalAum = useMemo(() => {
    return list
      .map((item) => item.aum * (price[item.underlyingToken.address] ?? 1))
      .reduce((acc, cur) => acc + cur, 0)
  }, [list, price])
  const totalRoe = useMemo(() => {
    if (totalAum === 0) return 0
    const totalProfit = list
      .map((item) =>
        BN(item.beginningAUM)
          .times(item.grossRoe)
          .times(price[item.underlyingToken.address] ?? 1)
          .toNumber()
      )
      .reduce((acc, cur) => BN(acc).plus(cur).toNumber(), 0)
    return BN(totalProfit).div(totalAum).times(100).toNumber()
  }, [list, price, totalAum])
  // 单个子基金, 有自己的 begninAUM * roe = 利润 * 当前资产价格 = usd 利润
  // 所有子基金, usd 利润 求和 = 总利润
  // 总利润 / 总aum = 总收益率
  // 年化收益率 = 总收益率 / 365 * 100%
  return (
    <dl>
      <dt>
        <VaultName
          name={'Core Crypto Index'}
          chain
          showFee
          managerName={'James'}
          status={list[0]?.status ?? 0}
        />
        <strong>{formatNumber(totalAum, 2, '$0,0.00')}</strong>
        <FlexBox center gap={5}>
          <RoeShow value={totalRoe} />
        </FlexBox>
        <span>{list[0].epochIndex}</span>
        <FlexBox center gap={5}>
          <Button size="mini" to="/vaults/group">
            Details
          </Button>
          <button
            className={classNames('vault-arrow', { show })}
            onClick={() => onRollChange(rollIndex)}
          >
            <Image src="icon/arrow-down-blue.svg" />
          </button>
        </FlexBox>
      </dt>
      <dd className={classNames({ show })}>
        {list.map((item) => (
          <div className="vault-item" key={item.address}>
            <VaultName icon={item.underlyingToken.icon} name={item.name} size="mini" />
            <FlexBox gap={5} className="vault-item-aum" vertical>
              <TokenValue
                value={item.aum}
                token={item.underlyingToken}
                format={'0,0.00'}
                size="mini"
              />
              <small>
                {formatNumber(item.aum * (price[item.underlyingToken.address] ?? 1), 2, '$0,0.00')}
              </small>
            </FlexBox>
            <FlexBox center gap={5}>
              <Tag type="warning" icon="icon/rocket.svg" name="Bring +++" />
            </FlexBox>
            <span></span>
            <span>
              <StakeButton data={[item]} />
            </span>
          </div>
        ))}
      </dd>
    </dl>
  )
}
