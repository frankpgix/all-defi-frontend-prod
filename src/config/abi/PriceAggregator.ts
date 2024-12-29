export const PriceAggregatorAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'InvalidOraclePrice',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidPriceFeed',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'PriceExpired',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'PriceFeedNotSet',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'priceFeed',
        type: 'address'
      }
    ],
    name: 'PriceFeedSet',
    type: 'event'
  },
  {
    inputs: [],
    name: 'TIMEOUT_THRESHOLD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      }
    ],
    name: 'latestPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'assets',
        type: 'address[]'
      }
    ],
    name: 'latestPrices',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'priceFeeds',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'priceFeed',
        type: 'address'
      }
    ],
    name: 'setPriceFeed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'valueInUSD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export default PriceAggregatorAbi
