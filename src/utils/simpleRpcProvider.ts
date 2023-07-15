import { ethers } from 'ethers'

const rpcUrl = import.meta.env.VITE_APP_NODE_1

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
