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
    42161: '0x4CF45D37b6E1EfAeD80D8B405B9Fb71fE6C5BBb5'
  },
  AllProtocol: {
    1: '',
    5: '0x69B6f439D9D2230701a62E246F7171A8a0B454dE',
    42161: '0x0E84681E1EB1b93ebc97999a4D826c6c000c2901'
  },
  FundReader: {
    1: '',
    5: '0xeECE1Cb0410FFD657dFf105f88Ba8a38010F499f',
    42161: '0xd26C491B881A9dD410EAFB10f77b9dD813641F83'
  },
  Reward: {
    1: '',
    5: '0x76a0b429D993a19C4C17Eb3e818440e761A339f1',
    42161: '0x50ac1194CfC059fE7FFc869e2b2610d8b3e1211F'
  },
  UniV3ACL: {
    1: '',
    5: '',
    42161: '0x9c9896b084415D9280fF4e5d8818291547e3280F'
  }
}

export default addresses
