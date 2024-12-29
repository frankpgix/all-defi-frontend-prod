import { VaultAbi } from './Vault'

export const VaultBaseAbi = [
  VaultAbi.find((item) => item && 'name' in item && item.name === 'baseInfo')
] as const

export default VaultBaseAbi
