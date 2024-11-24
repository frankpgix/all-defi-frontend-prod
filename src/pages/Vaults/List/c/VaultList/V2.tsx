import { FC } from 'react'

import { VaultBaseInfoDefault, VaultDetailDefault } from '@/data/vault'
import { formatNumber } from '@/utils/tools'
import StakeButton from '@@/Vaults/StakeButton'
import Button from '@@/common/Button'
import RoeShow from '@@/common/RoeShow'
import { FlexBox } from '@@/core/Box'
import Tag from '@@/core/Tag'
import { VaultName } from '@@/core/VaultName'

// import { VaultName } from '@@/common/T'

const VaultList: FC = () => {
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
          <dl>
            <dt>
              <VaultName name={"The Vault's Name"} managerName="Frank" status={0} />
              <span>{formatNumber(12345.12233, 2, '$0,0.00')}</span>
              <FlexBox center gap={5}>
                <RoeShow value={11} />
                <Tag name="Bring +++" />
              </FlexBox>
              <span>8</span>
              <span>
                <Button size="mini">Details</Button>
              </span>
            </dt>
            <dd>
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
            </dd>
          </dl>
        </section>
      </main>
    </div>
  )
}
export default VaultList
