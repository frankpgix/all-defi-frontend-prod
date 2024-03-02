import { useUserBalances } from '@/hooks/useProfile'

const Test = () => {
  const balance = useUserBalances()
  console.log(balance)
  return <>222</>
}

export default Test
