import { utils as EthUtils, BigNumber } from 'ethers'
const str = `0xf2ae372f000000000000000000000000000000000000000000000000000000000000014000000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000096cbb08fc7a9127c4d619537f0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000092c6a211f1133042361e1d0a00000000000000000000000000000000000000000000000000000000c38a96a07000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ff970a61a04b1ca14834a43f5de4533ebddb5cc800000000000000000000000082af49447d8a07e3bd95bd0d56f35241523fbab1`
export const useTools = () => {
  const abiCoder = EthUtils.defaultAbiCoder

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

  //
  // console.log(str.slice(0, 10))
  const fix = str.slice(0, 10)
  console.log(str, fix)
  console.log(EthUtils.hexDataSlice(str, 4))
  const deData = abiCoder.decode(types, EthUtils.hexDataSlice(str, 4))
  // console.log(deData)
  const enData = [...deData]
  enData[7] = BigNumber.from('180000000000000')
  // console.log(deData, enData)
  const ens = abiCoder.encode(types, enData)
  // console.log(JSON.stringify([transaction.to, transaction.data, transaction?.value || 0]))
  // console.log(transaction.data)
  console.log(ens.replace('0x', fix))

  // const iface = new EthUtils.Interface([
  //   `function createIncreasePosition(
  //       address[] memory _path,
  //       address _indexToken,
  //       uint256 _amountIn,
  //       uint256 _minOut,
  //       uint256 _sizeDelta,
  //       bool _isLong,
  //       uint256 _acceptablePrice,
  //       uint256 _executionFee,
  //       bytes32 _referralCode,
  //       address _callbackTarget
  //   )`
  // ])

  // iface.decodeFunctionData('createIncreasePosition', str)
}
