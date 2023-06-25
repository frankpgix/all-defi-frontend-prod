import { Hex } from 'viem'

export interface ReadContProps {
  error?: Error
  isIdle: boolean
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  isFetched: boolean
  isFetchedAfterMount: boolean
  isRefetching: boolean
  refetch: () => Promise<any>
  status: 'idle' | 'error' | 'loading' | 'success'
}

export interface WriteContProps {
  data?: { hash: Hex }
  error?: Error
  isError: boolean
  isIdle: boolean
  isLoading: boolean
  isSuccess: boolean
  write: ((args?: any) => void) | undefined
  writeAsync: ((args?: any) => Promise<{ hash: Hex }>) | undefined
  reset: () => void
  status: 'idle' | 'error' | 'loading' | 'success'
}
