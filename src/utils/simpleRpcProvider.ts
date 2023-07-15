import { ethers } from 'ethers'

const rpcUrl = process.env.REACT_APP_NODE_1

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(rpcUrl)
