import VaultAbi from './Vault.json'

export const VaultBaseAbi = [VaultAbi.find((item) => item.name === 'baseInfo')]

export default VaultBaseAbi
