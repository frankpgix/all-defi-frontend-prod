import { AddressType } from '@/types/base'
export interface profileProps {
  account: AddressType | undefined | ''
  isManager: boolean
  loading: boolean
  maxFundLimit: number
  update: (
    account: AddressType | undefined | '',
    isManager: boolean,
    maxFundLimit: number,
    loading: boolean
  ) => void
}
