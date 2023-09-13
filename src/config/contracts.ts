import { Address } from '@/config/types'

const addresses: Record<string, Address> = {
  multiCall: {
    1: '0xcA11bde05977b3631167028862bE2a173976CA11',
    5: '0xcA11bde05977b3631167028862bE2a173976CA11',
    42161: '0xcA11bde05977b3631167028862bE2a173976CA11'
  },
  ACProtocol: {
    1: '',
    5: '0xCa77Cc5799Ec51e0AE070241aA4FE4FA6A89a7D9',
    42161: '0x1Be94b1aF1E4C9821CE3570C4525494B559477AC'
  },
  AllProtocol: {
    1: '',
    5: '0x69B6f439D9D2230701a62E246F7171A8a0B454dE',
    42161: '0x0a121554E2A23fC6ccc8DA2F406d12258b6fb836'
  },
  FundReader: {
    1: '',
    5: '0xeECE1Cb0410FFD657dFf105f88Ba8a38010F499f',
    42161: '0x63e12F59fFCedE2c6f25468c42d5A7fC0CE687C8'
  },
  FundFactory: {
    1: '',
    5: '0xeECE1Cb0410FFD657dFf105f88Ba8a38010F499f',
    42161: '0x5af60E950622fC2078e53Bd881D9501a383b26D6'
  },
  Reward: {
    1: '',
    5: '0x76a0b429D993a19C4C17Eb3e818440e761A339f1',
    42161: '0x76199148ee7168aACaD9fcd9F714f070EA4206c1'
  },
  UniV3ACL: {
    1: '',
    5: '',
    42161: '0xdCE73E4a1Ea95F38872C8A3Cdf553D0bb35A0886'
  },
  Permit2: {
    1: '',
    5: '',
    42161: '0x000000000022D473030F116dDEE9F6B43aC78BA3'
  }
}

export default addresses
