import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import classNames from 'classnames'
// import { useRequest } from 'ahooks'
import { useParams, useNavigate } from 'react-router-dom'
import { without } from 'lodash'

import FundPool from '@/class/FundPool'
import AllProtocol from '@/class/AllProtocol'
import FundReader from '@/class/FundReader'
import { ProductProps } from '@/config/products'
import { getTokenByAddress } from '@/config/tokens'
// import { baseTokenOptions, getTokenByAddress } from '@/config/tokens'
import { CONTACT_US_URL } from '@/config'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'
// import { sleep } from '@/utils/tools'
// import { notify } from '@@/common/Toast'

import BlueLineSection from '@@/web/BlueLineSection'
import Loading from '@@/common/Loading'
import { TokenIcon } from '@@/common/TokenUnit'

import Button from '@@/common/Button'
import Image from '@@/common/Image'
import { Input } from '@@/common/Form'
// import { useMeasure } from 'react-use'
// import DataItem from '@@/common/DataItem'

// let baseDataStr = ''

const EditFund: FC = () => {
  const { getFundBase } = FundPool
  const { getFundUpdatingData } = FundReader
  const { getDerivativeList, updateFund } = AllProtocol
  const { fundAddress = '' } = useParams()
  const navigate = useNavigate()
  const { signer } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const [loading, setLoading] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [derivativeList, setDerivativeList] = useState<ProductProps[]>([])

  const [managerName, setManagerName] = useState('')
  const [baseTokenAddress, setBaseTokenAddress] = useState('')
  const [desc, setDesc] = useState('')
  const [oldDerivative, setOldDerivative] = useState<string[]>([])
  const [selectDerivative, setSelectDerivative] = useState<string[]>([])
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [baseDataStr, setBaseDataStr] = useState('')
  // const [minAmountNumber, setMinAmountNumber] = useState(0.0001)
  // const [decimals, setDecimals] = useState(18)
  const [verifyStatus, setVerifyStatus] = useState(2)

  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])

  const baseTokenName = useMemo(
    () => (baseToken.name === 'WETH' ? 'ETH' : baseToken.name),
    [baseToken.name]
  )

  const minAmountNumber = useMemo(() => {
    const zero = [...new Array(baseToken.precision - 1)].map(() => '0').join('')
    return Number(`0.${zero}1`)
  }, [baseToken.precision])

  const decimals = useMemo(() => baseToken.decimals, [baseToken.decimals])

  const getData = useCallback(async () => {
    if (fundAddress) {
      setLoading(true)
      const res = await getFundBase(fundAddress)
      // console.log(res, 'res')
      const p = await getDerivativeList()
      setDerivativeList(p)
      if (res) {
        setOldDerivative(res.derivatives)
        setBaseTokenAddress(res.baseToken)
        // const baseToken = getTokenByAddress(res.baseToken)
        // setDecimals(baseToken.decimals)
        // setMinAmountNumber(calcAmountNumber(baseToken.precision))

        const upRes = await getFundUpdatingData(fundAddress, res.baseToken)
        if (upRes) {
          setVerifyStatus(upRes.verifyStatus)
        }
        if (upRes && [0, 1].includes(upRes.verifyStatus)) {
          setManagerName(upRes.data.managerName)
          setDesc(upRes.data.desc)
          setMinAmount(String(upRes.data.subscriptionLimit[0]))
          setMaxAmount(String(upRes.data.subscriptionLimit[1]))
          // setSelectDerivative(without(selectDerivative, ...upRes.data.derivativesToRemove))
          setSelectDerivative(
            without(
              [...new Set([...res.derivatives, ...upRes.data.derivativesToAdd])],
              ...upRes.data.derivativesToRemove
            )
          )
          // [...selectDerivative, item]
        } else {
          setManagerName(res.managerName)
          setSelectDerivative(res.derivatives)
          setDesc(res.desc)
          setMinAmount(String(res.subscriptionMinLimit))
          setMaxAmount(String(res.subscriptionMaxLimit))
        }
      }

      setLoading(false)
      // await sleep(1000)
      // console.log(JSON.stringify(calcConfirmData()))
      // baseDataStr = JSON.stringify(calcConfirmData())
    }
  }, [getFundBase, fundAddress, getDerivativeList])

  useEffect(() => void getData(), [getData])
  // console.log(baseDataStr)
  const calcConfirmData = useCallback(() => {
    const delDerivative = oldDerivative.filter((item) => !selectDerivative.includes(item))
    const newDerivative = selectDerivative.filter((item) => !oldDerivative.includes(item))
    // console.log(selectDerivative, delDerivative, newDerivative)
    return { desc, managerName, newDerivative, delDerivative, minAmount, maxAmount, decimals }
  }, [decimals, desc, managerName, maxAmount, minAmount, oldDerivative, selectDerivative])
  const onConfirm = async () => {
    // console.log(selectDerivative)
    if (!fundAddress || !signer) return
    const data = calcConfirmData()
    // if (fundAddress) return
    const notifyId = await createNotify({ type: 'loading', content: 'Set Fund Base Info' })

    const { status, msg, hash } = await updateFund(fundAddress, data, signer)
    if (status) {
      await getData()
      updateNotifyItem(notifyId, { type: 'success', hash })
    } else {
      updateNotifyItem(notifyId, { type: 'error', title: 'Set Fund Base Info', content: msg, hash })
    }
  }

  const isDisabled = useMemo(() => [0, 1].includes(verifyStatus), [verifyStatus])

  const minAmountError = useMemo(
    () => Number(minAmount) < minAmountNumber && minAmount !== '',
    [minAmount, minAmountNumber]
  )
  const maxAmountError = useMemo(
    () => Number(maxAmount) <= Number(minAmount) && maxAmount !== '',
    [minAmount, maxAmount]
  )

  const disabledConfirm = useMemo(() => {
    if (loading) return true
    if (!isChange) return true
    if (derivativeList.length === 0) return true
    if (minAmountError || minAmount === '') return true
    if (maxAmountError || maxAmount === '') return true
    return false
  }, [derivativeList, maxAmountError, minAmountError, loading, isChange, minAmount, maxAmount])

  const onSelect = (item: string) => {
    if (!isDisabled) {
      if (selectDerivative.includes(item)) {
        setSelectDerivative(without(selectDerivative, item))
      } else {
        setSelectDerivative([...selectDerivative, item])
      }
    }
    // console.log(selectDerivative)
  }

  useEffect(() => {
    // console.log('isChange', isChange)
    if (loading) return
    if (baseDataStr === '' && managerName !== '') {
      setBaseDataStr(JSON.stringify(calcConfirmData()))
      return
    }
    // console.log('isChange1', isChange)
    // console.log(JSON.stringify(calcConfirmData()), 2, baseDataStr)
    if (JSON.stringify(calcConfirmData()) !== baseDataStr) {
      setIsChange(true)
    } else {
      setIsChange(false)
    }
  }, [
    loading,
    desc,
    managerName,
    oldDerivative,
    selectDerivative,
    minAmount,
    maxAmount,
    decimals,
    isChange,
    calcConfirmData,
    baseDataStr
  ])

  return (
    <>
      <BlueLineSection className="web-manage-create-step" title="Edit Fund Base Info">
        <div className="web-manage-create-step-3col">
          <Input
            value={managerName}
            label="manager name"
            count
            disabled={isDisabled}
            maxLength={20}
            onChange={setManagerName}
          />
        </div>
        <div className="web-manage-create-step-1col">
          <Input
            type="textarea"
            value={desc}
            label="manager introduction"
            count
            disabled={isDisabled}
            onChange={setDesc}
            maxLength={200}
          />
        </div>
        <div className="web-manage-create-step-2col">
          <Input
            type="number"
            value={minAmount}
            label="Minimum Deposit Amount"
            disabled={isDisabled}
            error={minAmountError}
            onChange={setMinAmount}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          >
            {minAmountError && (
              <p className="fall">
                Minimum deposit amount {minAmountNumber} {baseTokenName}
              </p>
            )}
          </Input>
          <Input
            type="number"
            value={maxAmount}
            label="Maximum Deposit Amount"
            error={maxAmountError}
            disabled={isDisabled}
            onChange={setMaxAmount}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
          />
        </div>
        <h3>select protocol allowed</h3>
        <ul className="web-manage-create-step-product-list">
          {derivativeList.map((item: ProductProps, index: number) => (
            <li
              key={index}
              onClick={() => onSelect(item.value)}
              className={classNames({ active: selectDerivative.includes(item.value) })}
            >
              <Image src={`products/${item.name}.png`} alt={item.name} />
            </li>
          ))}
        </ul>

        <footer>
          {[-1, 2].includes(verifyStatus) ? (
            <Button disabled={disabledConfirm} onClick={onConfirm}>
              confirm
            </Button>
          ) : (
            <>
              <Button outline onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button to={CONTACT_US_URL}>Contact us</Button>
            </>
          )}
        </footer>
      </BlueLineSection>
      <Loading type="fixed" show={loading} />
    </>
  )
}
export default EditFund
