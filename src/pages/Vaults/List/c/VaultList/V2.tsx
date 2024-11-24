import { FC, useState } from 'react'

import classNames from 'classnames'

import { VaultBaseInfoDefault, VaultDetailDefault } from '@/data/vault'
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
          {[1, 2].map((_, index) => (
            <dl>
              <dt>
                <VaultName name={"The Vault's Name"} managerName="Frank" status={0} />
                <span>{formatNumber(12345.12233, 2, '$0,0.00')}</span>
                <FlexBox center gap={5}>
                  <RoeShow value={11} />
                  <Tag name="Bring +++" />
                </FlexBox>
                <span>8</span>
                <FlexBox center gap={5}>
                  <Button size="mini">Details</Button>
                  <button
                    className={classNames('vault-arrow', { show: rollStatus[index] })}
                    onClick={() => onRollChange(index)}
                  >
                    <Image src="icon/arrow-down-blue.svg" />
                  </button>
                </FlexBox>
              </dt>
              <dd className={classNames({ show: rollStatus[index] })}>
                <div className="vault-item">
                  <VaultName name={"The Vault's Name"} size="mini" />
                  <span>{formatNumber(12345.12233, 2, '$0,0.00')}</span>
                  <FlexBox center gap={5}>
                    <RoeShow value={11} />
                    <Tag name="Bring +++" />
                  </FlexBox>
                  <span>8</span>
                  <span>
                    <StakeButton
                      getData={() => null}
                      data={VaultDetailDefault}
                      base={VaultBaseInfoDefault}
                    />
                  </span>
                </div>
                <div className="vault-item">
                  <VaultName name={"The Vault's Name"} size="mini" />
                  <span>{formatNumber(12345.12233, 2, '$0,0.00')}</span>
                  <FlexBox center gap={5}>
                    <RoeShow value={11} />
                    <Tag name="Bring +++" />
                  </FlexBox>
                  <span>8</span>
                  <span>
                    <StakeButton
                      getData={() => null}
                      data={VaultDetailDefault}
                      base={VaultBaseInfoDefault}
                    />
                  </span>
                </div>
              </dd>
            </dl>
          ))}
        </section>
      </main>
    </div>
  )
}
export default VaultList
