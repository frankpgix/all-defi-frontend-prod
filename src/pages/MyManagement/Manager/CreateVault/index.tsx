import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import {
//   useCalcAUMLimit,
//   useCreateVault,
//   useDerivativeList
// } from '@/hooks/Contracts/useAllProtocol'
import { useCreateVault } from '@/hooks/Contracts/useVaultFactory'
import { useProfile } from '@/hooks/useProfile'
import { useUnderlyingTokens } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { CreateVaultStep1DataTypes, CreateVaultStep2DataTypes } from '@/types/createVault'

import { CreateVaultStep1DataDefault } from '@/data/createVault'
import Cache from '@/utils/cache'

import Step1 from './c/Step1'
import Step2 from './c/Step2'
// import Step3 from './c/Step3'
import Step4 from './c/Step4'
import StepLine from './c/StepLine'
import SuccDialog from './c/SuccDialog'

const CreateFund: FC = () => {
  // const { createFund, calcAUMLimit, getDerivativeList } = AllProtocol
  const { account } = useProfile()
  const navigate = useNavigate()
  const underlyingTokens = useUnderlyingTokens()

  const { onCreateVault } = useCreateVault()
  // const { createNotify, updateNotifyItem } = useNotify()

  const [stepIndex, setStepIndex] = useState(0)
  const [step1Data, setStep1Data] = useState<CreateVaultStep1DataTypes>(CreateVaultStep1DataDefault)
  const [minAmount, setMinAmount] = useState(0)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(underlyingTokens[0].address)
  // const [derivativeList, setDerivativeList] = useState<VaultDerivativesProps[]>([])
  // const [multiple, setMultiple] = useState<number>(0)
  const [succDialogStatus, setSuccDialogStatus] = useState<boolean>(false)

  // const { data: derivativeList } = useDerivativeList()
  // const { data: multiple, refetch: reGetMultiple } = useCalcAUMLimit(baseTokenAddress)
  // console.log(derivativeList)
  // useEffect(() => void reGetMultiple(), [baseTokenAddress])

  const onStep1Confirm = (data: CreateVaultStep1DataTypes) => {
    setStep1Data(data)
    setStepIndex(1)
  }

  const onStep2Confirm = (data: CreateVaultStep2DataTypes) => {
    // Cache.set('CreateFundStep2Temp', data)
    const { minimumStake, underlying } = data
    setMinAmount(minimumStake)
    setBaseTokenAddress(underlying)
    setStepIndex(2)
  }

  // const onStep3Confirm = (data: number) => {
  //   // Cache.set('CreateFundStep3Temp', data)
  //   setStakeAmount(data)
  //   setStepIndex(3)
  // }

  const onStep4Confirm = async () => {
    if (account) {
      await onCreateVault(
        {
          ...step1Data,
          minimumStake: minAmount,
          underlying: baseTokenAddress
        },
        account,
        () => {
          // setSuccDialogStatus(true)
          Cache.rm('CreateFundStep1Temp')
          Cache.rm('CreateFundStep2Temp')
          Cache.rm('CreateFundStep3Temp')
          navigate('/manage/manager')
        }
      )
    }
  }

  const onBack = () => setStepIndex(stepIndex - 1)

  const onSuccDialogConfirm = () => {
    setSuccDialogStatus(false)
    navigate('/manage/manager')
  }

  return (
    <>
      <StepLine activeIndex={stepIndex} />
      <Step1 show={stepIndex === 0} onConfirm={onStep1Confirm} />
      <Step2 show={stepIndex === 1} onBack={onBack} onConfirm={onStep2Confirm} />
      <Step4
        show={stepIndex === 2}
        data={{ ...step1Data, minAmount }}
        onBack={onBack}
        onConfirm={onStep4Confirm}
        baseTokenAddress={baseTokenAddress}
        multiple={1}
      />
      <SuccDialog show={succDialogStatus} data={step1Data} onConfirm={onSuccDialogConfirm} />
    </>
  )
}

export default CreateFund
