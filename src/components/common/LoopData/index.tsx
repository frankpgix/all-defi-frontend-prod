// import { FC, useEffect } from 'react'
// import { useInterval } from 'ahooks'
// import { useAppDispatch } from '@/store'
// import { getTokensBalanceAsync } from '@/store/tokens'
// // import { useTokensData } from '@/store/tokens/hooks'
// import { useProfile } from '@/hooks/useProfile'

// const LoopData: FC = () => {
//   const dispatch = useAppDispatch()
//   const { account, signer } = useProfile()

//   useInterval(() => {
//     dispatch(getTokensBalanceAsync(signer))
//   }, 30000)

//   useEffect(() => {
//     dispatch(getTokensBalanceAsync(signer))
//   }, [signer, account, dispatch])

//   return null
// }

// export default LoopData
