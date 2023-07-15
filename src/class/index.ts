// import type { Signer } from 'ethers'
//
// import { getGameContract, getChipContract } from '@/utils/contractHelpers'
// import { estimateGas, setAllowance } from '@/utils/practicalMethod'
// import { getGameAddress, getUSDTAddress, getCHIPAddress } from '@/utils/addressHelpers'
// import { getUnitAmount, nonBigNumberInterception } from '@/utils/tools'
//
// class ChipGame {
//   // constructor() {}
//
//   // usdt 兑换 chip
//   exUsdtToChip = async (amount: number, signer: Signer) => {
//     // 将参数由普通 number 类型，转成 uint256 类型，18 是精度参数
//     const _amount = getUnitAmount(String(amount), 18)
//     // 创建合约连接
//     const contract = getGameContract(signer)
//     try {
//       // 对需要操作的币种，以及合约，进行授权操作
//       const approve = await setAllowance(signer, getGameAddress(), getUSDTAddress(), _amount)
//       // 如果授权没有成功，返回失败
//       if (!approve) return false
//
//       // 根据合约和参数，计算 gas 费用，最后的 0 是允许计算的偏差值，如果总是失败，可以将值设置大一些
//       const gasLimit = await estimateGas(contract, 'exchangeCHIPWithUSDT', [_amount], 0)
//       //  调用合约
//       const response = await contract.exchangeCHIPWithUSDT(_amount, { gasLimit })
//       // 等待结果
//       const receipt = await response.wait()
//       // 返回结果
//       return receipt.status
//     } catch (e) {
//       console.info(e)
//       // 如果失败，返回失败
//       return false
//     }
//   }
//
//   // chip 兑换 usdt
//   exChipToUsdt = async (amount: number, signer: Signer) => {
//     const _amount = getUnitAmount(String(amount), 0)
//     const contract = getGameContract(signer)
//     try {
//       const approve = await setAllowance(signer, getGameAddress(), getCHIPAddress(), _amount)
//
//       if (!approve) return false
//
//       const gasLimit = await estimateGas(contract, 'exchangeUSDTWithCHIP', [_amount], 0)
//       const response = await contract.exchangeUSDTWithCHIP(_amount, { gasLimit })
//       const receipt = await response.wait()
//
//       return receipt.status
//     } catch (e) {
//       console.info(e)
//       return false
//     }
//   }
//
//   // 押注
//   goBet = async (amount: number, direction: 'big' | 'small', signer: Signer) => {
//     const _amount = getUnitAmount(String(amount), 0)
//     const contract = getChipContract(signer)
//     console.log(contract)
//     const directions = {
//       small: 0x00,
//       big: 0x01
//     }
//     const _direction = directions[direction]
//     const chipAddress = getCHIPAddress()
//     const gameAddress = getGameAddress()
//     try {
//       const approve = await setAllowance(signer, chipAddress, chipAddress, _amount)
//
//       if (!approve) return false
//
//       const gasLimit = await estimateGas(
//         contract,
//         'transferAndCall(address,uint256,bytes)',
//         [gameAddress, _amount, _direction],
//         0
//       )
//       const response = await contract['transferAndCall(address,uint256,bytes)'](gameAddress, _amount, _direction, {
//         gasLimit
//       })
//       const receipt = await response.wait()
//
//       return receipt.status
//     } catch (e) {
//       console.info(e)
//       return false
//     }
//   }
//
//   // 获取当前大小分别的押注值
//   getCurrBetChip = async () => {
//     try {
//       const contract = getGameContract()
//       const big = nonBigNumberInterception(await contract.betMax())
//       const small = nonBigNumberInterception(await contract.betMin())
//       return { big, small }
//     } catch (error) {
//       return { big: '0', small: '0' }
//     }
//   }
//
//   // 获取当前轮次以及共计押注值
//   getCurrRoundInfo = async () => {
//     const contract = getGameContract()
//     const totalBet = nonBigNumberInterception(await contract.totalBet())
//     const round = nonBigNumberInterception(await contract.round())
//     return { totalBet, round }
//   }
//
//   // 获取历史投注记录
//   getHistory = async () => {
//     const res = []
//     try {
//       const contract = getGameContract()
//       const round = Number(nonBigNumberInterception(await contract.round())) - 1
//       const min = round - 10 > 0 ? round - 10 : 0
//       for (let index = round; index >= min; index--) {
//         const r = getUnitAmount(String(index), 0)
//         const resp = await contract.results(r)
//         res.push({
//           round: index,
//           totalPlayer: resp?.totalBet ?? 0,
//           direction: resp?.numberSelected === 1 ? '大' : '小'
//         })
//       }
//       return res
//     } catch (error) {
//       console.info(error)
//       return res
//     }
//   }
// }
//
// export default new ChipGame()

export default null
