import { utils as EthUtils, BigNumber } from 'ethers'

export const fixGmxTrade = (
  data: string,
  value?: string | number
): { data: string; value?: string | number } => {
  const abiCoder = EthUtils.defaultAbiCoder
  const fix = data.slice(0, 10)
  if (fix === '0xf2ae372f') {
    const types = [
      'address[]',
      'address',
      'uint256',
      'uint256',
      'uint256',
      'bool',
      'uint256',
      'uint256',
      'bytes32',
      'address'
    ]

    const deData = abiCoder.decode(types, EthUtils.hexDataSlice(data, 4))
    // console.log(deData)
    const enData = [...deData]
    enData[7] = BigNumber.from('180000000000000')
    // console.log(deData, enData)
    const ens = abiCoder.encode(types, enData)

    return { data: ens.replace('0x', fix), value: '180000000000000' }
  }
  if (fix === '0x7be7d141') {
    const types = [
      'address[]',
      'address ',
      'uint256',
      'uint256',
      'bool',
      'address',
      'uint256',
      'uint256',
      'uint256 ',
      'bool',
      'address'
    ]
    const deData = abiCoder.decode(types, EthUtils.hexDataSlice(data, 4))
    // console.log(deData)
    const enData = [...deData]
    enData[8] = BigNumber.from('180000000000000')
    // console.log(deData, enData)
    const ens = abiCoder.encode(types, enData)

    return { data: ens.replace('0x', fix), value: '180000000000000' }
  }
  return { data, value }
}
