import { useContext } from 'react'

import { MobileContext } from '@/context/Mobile'

export const useMobile = () => {
  const { mobile } = useContext(MobileContext)
  return { mobile }
}

export default useMobile
