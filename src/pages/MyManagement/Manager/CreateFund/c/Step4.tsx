import React, { FC, useMemo } from 'react'
import BN from 'bignumber.js'

import { ProductProps } from '@/config/products'
import { getTokenByAddress } from '@/config/tokens'

import BlueLineSection from '@@/web/BlueLineSection'
import Button from '@@/common/Button'
import Image from '@@/common/Image'
import { Input } from '@@/common/Form'
import { TokenIcon } from '@@/common/TokenUnit'

import DataItem from '@@/common/DataItem'

interface Props {
  onConfirm: () => void
  onBack: () => void
  show: boolean
  data: Record<string, any>
  multiple: number
  baseTokenAddress: string
}

const Step4: FC<Props> = ({ onConfirm, show, onBack, data, multiple, baseTokenAddress }) => {
  const maxAUM = useMemo(
    () => BN(data.stakeAmount).multipliedBy(multiple).toNumber(),
    [data.stakeAmount, multiple]
  )
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])
  return (
    <>
      <BlueLineSection hide={!show} className="web-manage-create-step" title="Step 4 Review">
        <div className="web-manage-create-step-3col">
          <Input value={data.name} label="fund name" count maxLength={20} disabled />
          <Input value={data.symbol} label="fund symbol" count maxLength={20} disabled />
          <Input value={data.managerName} label="manager name" count maxLength={20} disabled />
        </div>
        <Input
          type="textarea"
          value={data.desc}
          label="manager introduction"
          count
          disabled
          maxLength={100}
        />
        {/*<h2>Deposit Limits</h2>*/}
        <div className="web-manage-create-step-2col">
          <Input
            type="number"
            label="Minimum Deposit Amount"
            value={data.minAmount}
            disabled
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
          <Input
            type="number"
            label="Maximum Deposit Amount"
            value={data.maxAmount}
            disabled
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
        </div>
        <div className="web-manage-create-step-1col">
          <DataItem label="selected protocol">
            {data.address.map((item: ProductProps, index: number) => (
              <Image key={index} src={`/products/${item.name}.png`} />
            ))}
          </DataItem>
        </div>
        <div className="web-manage-create-step-1col">
          <Input
            value={maxAUM}
            label="expected fund max aum limit"
            disabled
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
        </div>
        <div className="web-manage-create-step-1col">
          <Input value="20%" label="Incentive Rate" disabled />
        </div>

        <footer>
          <Button onClick={onBack} outline>
            back
          </Button>
          <Button onClick={() => onConfirm()}>next</Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step4
