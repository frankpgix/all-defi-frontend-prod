import contracts from '@/config/contracts'

export const getBep20Contracts = (address: string, functionName: string) => {
  return { ...contracts.bep20(address), functionName }
}
export const getAllProtocolContracts = (functionName: string) => {
  return { ...contracts.AllProtocol, functionName }
}
