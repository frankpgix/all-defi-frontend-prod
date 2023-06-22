import { useAccount } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  // const { data: ensName } = useEnsName({ address })
  // console.log(address, ensName)
  return <div>{address}</div>
}
