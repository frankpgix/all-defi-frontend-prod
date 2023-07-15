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
    42161: '0xF6BDde8f744013936B11c74208289f038CBFdCe7'
  },
  AllProtocol: {
    1: '',
    5: '0x69B6f439D9D2230701a62E246F7171A8a0B454dE',
    42161: '0x49A5Ed44d3e35576c8e33054b8e263F29A6586C9'
  },
  FundReader: {
    1: '',
    5: '0xeECE1Cb0410FFD657dFf105f88Ba8a38010F499f',
    42161: '0x024B4fF6FB9AFb717a0ada025856cF70e06B0705'
  },
  Reward: {
    1: '',
    5: '0x76a0b429D993a19C4C17Eb3e818440e761A339f1',
    42161: '0x44E35Ec5a6ED251d168682b91Db93C8A91a5C6AA'
  },
  UniV3ACL: {
    1: '',
    5: '',
    42161: '0xdCE73E4a1Ea95F38872C8A3Cdf553D0bb35A0886'
  }
}

export default addresses
