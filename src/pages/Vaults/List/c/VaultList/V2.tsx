import { FC, useMemo, useState } from 'react'

import classNames from 'classnames'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useVaultList } from '@/hooks/Contracts/useVaultReader'

import { VaultDetailProps } from '@/types/vault'

import { formatNumber } from '@/utils/tools'
import StakeButton from '@@/Vaults/StakeButton'
import Button from '@@/common/Button'
import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
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
          <strong>APY</strong>
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
  const {
    data: price,
    isLoading,
    isSuccess
  } = useAssetLatestPrices(assetTokenList, list[0]?.epochStartBlock)
  const aum = useMemo(() => {
    return list
      .map((item) => item.aum * (price[item.underlyingToken.address] ?? 1))
      .reduce((acc, cur) => acc + cur, 0)
  }, [list, price])
  console.log(price, isLoading, isSuccess)
  return (
    <dl>
      <dt>
        <VaultName name={'AllDeFi Vault'} managerName={'Kevin'} status={list[0]?.status ?? 0} />
        <span>{formatNumber(aum, 2, '$0,0.00')}</span>
        <FlexBox center gap={5}>
          <RoeShow value={11} />
          <Tag name="Bring +++" />
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
            <span>
              {formatNumber(item.aum * (price[item.underlyingToken.address] ?? 1), 2, '$0,0.00')}
            </span>
            <FlexBox center gap={5}>
              <RoeShow value={11} />
              <Tag name="Bring +++" />
            </FlexBox>
            <span>{item.epochIndex}</span>
            <span>
              <StakeButton data={[item]} />
            </span>
          </div>
        ))}
      </dd>
    </dl>
  )
}
