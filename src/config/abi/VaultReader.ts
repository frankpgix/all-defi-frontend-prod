export const VaultReaderAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address'
      }
    ],
    name: 'AdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address'
      }
    ],
    name: 'BeaconUpgraded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
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
        name: 'implementation',
        type: 'address'
      }
    ],
    name: 'Upgraded',
    type: 'event'
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'contract IFactory',
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
        name: '_factory',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'proxiableUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
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
        name: 'newImplementation',
        type: 'address'
      }
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'userDetail',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vaultAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'stage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sharePrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingStake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingUnstake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'unclaimedUnderlying',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct VaultReader.UserDetail',
        name: 'detail',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'indexFrom',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'indexTo',
        type: 'uint256'
      }
    ],
    name: 'userDetailList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vaultAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'stage',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sharePrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingStake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingUnstake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'unclaimedUnderlying',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct VaultReader.UserDetail[]',
        name: '_users',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_vault',
        type: 'address'
      }
    ],
    name: 'vaultDetail',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vaultAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'createTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochIndex',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartBlock',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64[3]',
            name: 'stageDurations',
            type: 'uint64[3]'
          },
          {
            internalType: 'uint64',
            name: 'stage',
            type: 'uint64'
          },
          {
            internalType: 'uint256',
            name: 'totalShares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'beginningAUM',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'aum',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sharePrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'cashBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'custodianBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingStake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingUnstake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'managerFee',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'platFee',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct VaultReader.VaultDetail',
        name: 'detail',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'indexFrom',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'indexTo',
        type: 'uint256'
      }
    ],
    name: 'vaultDetailList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vaultAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'createTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochIndex',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartBlock',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64[3]',
            name: 'stageDurations',
            type: 'uint64[3]'
          },
          {
            internalType: 'uint64',
            name: 'stage',
            type: 'uint64'
          },
          {
            internalType: 'uint256',
            name: 'totalShares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'beginningAUM',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'aum',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sharePrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'cashBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'custodianBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingStake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingUnstake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'managerFee',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'platFee',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct VaultReader.VaultDetail[]',
        name: '_details',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'vaults',
        type: 'address[]'
      }
    ],
    name: 'vaultDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vaultAddress',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'manager',
            type: 'address'
          },
          {
            internalType: 'uint64',
            name: 'createTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochIndex',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartBlock',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'epochStartTime',
            type: 'uint64'
          },
          {
            internalType: 'uint64[3]',
            name: 'stageDurations',
            type: 'uint64[3]'
          },
          {
            internalType: 'uint64',
            name: 'stage',
            type: 'uint64'
          },
          {
            internalType: 'uint256',
            name: 'totalShares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'beginningAUM',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'aum',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sharePrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'cashBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'custodianBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingStake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pendingUnstake',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'managerFee',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'platFee',
            type: 'uint256'
          },
          {
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct VaultReader.VaultDetail[]',
        name: '_details',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'vaultList',
    outputs: [
      {
        internalType: 'address[]',
        name: 'vaults',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export default VaultReaderAbi
