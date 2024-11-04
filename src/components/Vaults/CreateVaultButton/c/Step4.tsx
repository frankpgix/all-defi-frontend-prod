import { FC, useMemo } from 'react'

import { useToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'

import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import { Input } from '@@/common/Form'
import Image from '@@/common/Image'
import { TokenIcon } from '@@/common/TokenUnit'
import BlueLineSection from '@@/web/BlueLineSection'

interface Props {
  onConfirm: () => void
  onBack: () => void
  show: boolean
  disabled: boolean
  data: Record<string, any>
  multiple: number
  baseTokenAddress: AddressType
}

const Step4: FC<Props> = ({ onConfirm, show, onBack, data, disabled, baseTokenAddress }) => {
  const { getTokenByAddress } = useToken()
  // const maxAUM = useMemo(
  //   () => BN(data.stakeAmount).multipliedBy(multiple).toNumber(),
  //   [data.stakeAmount, multiple]
  // )
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])
  return (
    <>
      <BlueLineSection hide={!show} web={false} className="c-create-step" title="Step 3 Review">
        <div className="c-create-step-3col">
          <Input value={data.name} label="Vault name" count disabled />
          <Input value={data.symbol} label="Vault symbol" count disabled />
          <Input value={data.managerName} label="manager name" count disabled />
        </div>
        <div className="c-create-step-1col">
          <Input type="textarea" value={data.desc} label="manager introduction" count disabled />
        </div>
        <div className="c-create-step-2col">
          <Input
            type="number"
            label="Minimum Deposit Amount"
            value={data.minAmount}
            disabled
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
          <Input value="20%" label="Incentive Rate" disabled />
        </div>
        <div className="c-create-step-1col">
          <DataItem label="selected protocol">
            <ul className="c-create-step-product-list">
              <li>
                <Image src={`/products/BRINGTRADE.svg`} alt={'BRINGTRADE'} />
              </li>
            </ul>
          </DataItem>
        </div>
        {/*  <div className="c-create-step-1col">
          <Input
            value={maxAUM}
            label="expected max aum limit"
            disabled
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
        </div> */}
        {/* <div className="c-create-step-1col">
          <Input value="20%" label="Incentive Rate" disabled />
        </div> */}

        <footer>
          <Button onClick={onBack} outline>
            back
          </Button>
          <Button disabled={disabled} onClick={() => onConfirm()}>
            Create
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step4
