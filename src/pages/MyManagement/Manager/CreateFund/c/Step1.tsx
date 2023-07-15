import React, { FC, useMemo, useState } from 'react'

import BlueLineSection from '@@/web/BlueLineSection'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'

export interface Step1DataProps {
  name: string
  symbol: string
  managerName: string
  desc: string
}

export const Step1DataDefault = { name: '', symbol: '', managerName: '', desc: '' }

interface Props {
  onConfirm: (data: Step1DataProps) => void
  show: boolean
}

const Step1: FC<Props> = ({ onConfirm, show }) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [managerName, setManagerName] = useState('')
  const [desc, setDesc] = useState('')

  const isDisabled = useMemo(() => !name || !symbol || !managerName || !desc, [desc, managerName, name, symbol])

  return (
    <>
      <BlueLineSection hide={!show} className="web-manage-create-step" title="Step 1 Basic Info">
        <div className="web-manage-create-step-3col">
          <Input
            value={name}
            onChange={(val) => setName(val)}
            label="fund name"
            count
            maxLength={20}
            placeholder="Enter Fund Name"
          />
          <Input
            value={symbol}
            onChange={(val) => setSymbol(val)}
            label="fund symbol"
            count
            maxLength={20}
            placeholder="Enter Fund Symbol"
          />
          <Input
            value={managerName}
            onChange={(val) => setManagerName(val)}
            label="manager name"
            count
            maxLength={20}
            placeholder="Enter Manager Namel"
          />
        </div>
        <Input
          type="textarea"
          value={desc}
          onChange={(val) => setDesc(val)}
          label="manager introduction"
          count
          maxLength={100}
          placeholder="Enter Introduction"
        />
        <footer>
          <Button disabled={isDisabled} onClick={() => onConfirm({ name, symbol, managerName, desc })}>
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step1
