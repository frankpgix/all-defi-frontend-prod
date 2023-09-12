import React, { FC, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import AllProtocol from '@/class/AllProtocol'
import { ProductProps } from '@/config/products'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

// import { notify } from '@@/common/Toast'

import StepLine from './c/StepLine'
import Step1, { Step1DataProps, Step1DataDefault } from './c/Step1'
import Step2, { Step2ConfirmProps } from './c/Step2'
import Step3 from './c/Step3'
import Step4 from './c/Step4'
import SuccDialog from './c/SuccDialog'

const CreateFund: FC = () => {
  const { createFund, calcAUMLimit, getDerivativeList } = AllProtocol
  const { signer } = useProfile()
  const navigate = useNavigate()
  const { createNotify, updateNotifyItem } = useNotify()

  const [stepIndex, setStepIndex] = useState(0)
  const [step1Data, setStep1Data] = useState<Step1DataProps>(Step1DataDefault)
  const [address, setAddress] = useState<ProductProps[]>([])
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(0)
  const [baseTokenAddress, setBaseTokenAddress] = useState('')
  const [stakeAmount, setStakeAmount] = useState<number>(0)
  const [derivativeList, setDerivativeList] = useState<ProductProps[]>([])
  const [multiple, setMultiple] = useState<number>(0)
  const [succDialogStatus, setSuccDialogStatus] = useState<boolean>(true)

  const getData = useCallback(async () => {
    const p = await getDerivativeList()
    setDerivativeList(p)
  }, [getDerivativeList])

  useEffect(() => void getData(), [getData])

  const getMultiple = useCallback(async () => {
    if (baseTokenAddress) {
      const multiple = await calcAUMLimit(baseTokenAddress)
      // console.log(multiple, 221111)
      setMultiple(multiple)
    }
  }, [baseTokenAddress, calcAUMLimit])

  useEffect(() => void getMultiple(), [getMultiple])

  const onStep1Confirm = (data: Step1DataProps) => {
    setStep1Data(data)
    setStepIndex(1)
  }

  const onStep2Confirm = (data: Step2ConfirmProps) => {
    const { addresss, minAmount, maxAmount, baseTokenAddress } = data
    setAddress(addresss)
    setMinAmount(minAmount)
    setMaxAmount(maxAmount)
    setBaseTokenAddress(baseTokenAddress)
    setStepIndex(2)
  }

  const onStep3Confirm = (data: number) => {
    setStakeAmount(data)
    setStepIndex(3)
  }

  const onStep4Confirm = async () => {
    if (signer) {
      // navigate('/manage/manager')
      const notifyId = await createNotify({ type: 'loading', content: 'Create Fund' })

      const { status, msg, hash } = await createFund(
        {
          ...step1Data,
          derivatives: address.map((item) => item.value),
          minAmount,
          maxAmount,
          stakeAmount,
          baseTokenAddress
        },
        signer
      )
      if (status) {
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Create Fund', content: msg, hash })
      }
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
      <Step2
        show={stepIndex === 1}
        derivativeList={derivativeList}
        onBack={onBack}
        onConfirm={onStep2Confirm}
      />
      <Step3
        show={stepIndex === 2}
        onBack={onBack}
        baseTokenAddress={baseTokenAddress}
        onConfirm={onStep3Confirm}
        multiple={multiple}
      />
      <Step4
        show={stepIndex === 3}
        data={{ ...step1Data, address, stakeAmount, minAmount, maxAmount }}
        onBack={onBack}
        onConfirm={onStep4Confirm}
        baseTokenAddress={baseTokenAddress}
        multiple={multiple}
      />
      <SuccDialog show={succDialogStatus} data={step1Data} onConfirm={onSuccDialogConfirm} />
    </>
  )
}

export default CreateFund
