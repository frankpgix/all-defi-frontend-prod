import { FC, useMemo, useState, useEffect } from 'react'

import BlueLineSection from '@@/web/BlueLineSection'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import Cache from '@/utils/cache'

import { CreateVaultStep1DataTypes } from '@/types/createVault'

interface Props {
  onConfirm: (data: CreateVaultStep1DataTypes) => void
  show: boolean
}

const Step1: FC<Props> = ({ onConfirm, show }) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [managerName, setManagerName] = useState('')
  const [desc, setDesc] = useState('')

  const isDisabled = useMemo(
    () => !name || !symbol || !managerName || !desc,
    [desc, managerName, name, symbol]
  )

  useEffect(() => {
    if (name || symbol || managerName || desc) {
      Cache.set('CreateFundStep1Temp', { name, symbol, managerName, desc })
    }
  }, [name, symbol, managerName, desc])

  useEffect(() => {
    const createFundStep1Temp = Cache.get('CreateFundStep1Temp')
    if (createFundStep1Temp) {
      const { name, symbol, managerName, desc } = createFundStep1Temp
      setName(name)
      setSymbol(symbol)
      setManagerName(managerName)
      setDesc(desc)
    }
  }, [])
  return (
    <>
      <BlueLineSection hide={!show} className="web-manage-create-step" title="Step 1 Basic Info">
        <div className="web-manage-create-step-3col">
          <Input
            value={name}
            onChange={(val) => setName(val)}
            label="Vault name"
            count
            maxLength={20}
            placeholder="Enter Vault Name"
          />
          <Input
            value={symbol}
            onChange={(val) => setSymbol(val)}
            label="Vault symbol"
            count
            maxLength={20}
            placeholder="Enter Vault Symbol"
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
          maxLength={200}
          placeholder="Enter Introduction"
        />
        <footer>
          <Button
            disabled={isDisabled}
            onClick={() => onConfirm({ name, symbol, managerName, desc })}
          >
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step1
