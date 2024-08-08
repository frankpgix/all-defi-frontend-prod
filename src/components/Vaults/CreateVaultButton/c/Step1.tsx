import { FC, useEffect, useMemo, useState } from 'react'

import { CreateVaultStep1DataTypes } from '@/types/createVault'

import Cache from '@/utils/cache'
import Button from '@@/common/Button'
import { Input } from '@@/common/Form'
import BlueLineSection from '@@/web/BlueLineSection'

interface Props {
  onConfirm: (data: CreateVaultStep1DataTypes) => void
  show: boolean
}

const Step1: FC<Props> = ({ onConfirm, show }) => {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [managerName, setManagerName] = useState('')
  const [desc, setDesc] = useState('')

  const nameError = useMemo(() => Boolean(name && name.length < 3), [name])
  const symbolError = useMemo(() => Boolean(symbol && symbol.length < 3), [symbol])
  const managerNameError = useMemo(
    () => Boolean(managerName && managerName.length < 3),
    [managerName]
  )

  const isDisabled = useMemo(
    () => !name || !symbol || !managerName || !desc || nameError || symbolError || managerNameError,
    [desc, managerName, name, symbol, nameError, symbolError, managerNameError]
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
      <BlueLineSection hide={!show} web={false} className="c-create-step" title="Step 1 Basic Info">
        <div className="c-create-step-3col">
          <Input
            value={name}
            onChange={(val) => setName(val)}
            label="Vault name"
            count
            maxLength={20}
            placeholder="Enter Vault Name"
            error={nameError}
          >
            {nameError && <p className="fall">String must contain at least 3 character</p>}
          </Input>
          <Input
            value={symbol}
            onChange={(val) => setSymbol(val)}
            label="Vault symbol"
            count
            maxLength={10}
            placeholder="Enter Vault Symbol"
            error={symbolError}
          >
            {symbolError && <p className="fall">String must contain at least 3 character</p>}
          </Input>
          <Input
            value={managerName}
            onChange={(val) => setManagerName(val)}
            label="manager name"
            count
            maxLength={20}
            placeholder="Enter Manager Name"
            error={managerNameError}
          >
            {managerNameError && <p className="fall">String must contain at least 3 character</p>}
          </Input>
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
            Next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step1
