import { useUserBalances } from '@/hooks/useToken'

const Test = () => {
  const balance = useUserBalances()
  console.log(balance)
  return <>222</>
}

export default Test
