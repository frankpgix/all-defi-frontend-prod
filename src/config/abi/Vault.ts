export const VaultAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AmountTooLarge',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AmountTooSmall',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AssetForbidden',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ETHNotAllowed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ETHTransferFailed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InsufficientReserve',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InsufficientShares',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidConfigParam',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidETHAmount',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidStage',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTotalValue',
    type: 'error'
  },
  {
    inputs: [],
    name: 'MinSharesViolation',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NothingToCancel',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NothingToClaim',
    type: 'error'
  },
  {
    inputs: [],
    name: 'StrategyNotStarted',
    type: 'error'
  },
  {
    inputs: [],
    name: 'VaultPaused',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'enum IVault.ConfigParam',
        name: 'param',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'value',
        type: 'bytes'
      }
    ],
    name: 'Configured',
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
        indexed: false,
        internalType: 'bool',
        name: 'paused',
        type: 'bool'
      }
    ],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'beginningAUM',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sharePrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingStake',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pendingUnstake',
        type: 'uint256'
      }
    ],
    name: 'Settled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'TokenRecovered',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bool',
        name: 'inSettlement',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'TotalValueUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epochIndex',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'enum IVault.ActionType',
        name: 'actionType',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'UserAction',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
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
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
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
    name: 'baseInfo',
    outputs: [
      {
        components: [
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
            internalType: 'string',
            name: 'symbol',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'managerName',
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
            internalType: 'uint64[3]',
            name: 'stageDurations',
            type: 'uint64[3]'
          },
          {
            internalType: 'uint256[2]',
            name: 'stakeLimits',
            type: 'uint256[2]'
          },
          {
            internalType: 'address',
            name: 'platFeeTo',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'custodian',
            type: 'address'
          }
        ],
        internalType: 'struct IVault.BaseInfo',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cancelStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cancelUnstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'epochInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'index',
            type: 'uint128'
          },
          {
            internalType: 'uint64',
            name: 'startBlock',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'startTime',
            type: 'uint64'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'beginningAUM',
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
            internalType: 'int256',
            name: 'historicalReturn',
            type: 'int256'
          }
        ],
        internalType: 'struct IVault.Epoch',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'executeSettlement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_managerName',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_manager',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'uint256[2]',
        name: '_stakeLimits',
        type: 'uint256[2]'
      },
      {
        internalType: 'address',
        name: '_platFeeTo',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_silo',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_admin',
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
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'recoverToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'reserveNeeded',
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
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_paused',
        type: 'bool'
      }
    ],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'settlementPrice',
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
    name: 'sharePriceAndFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharePrice',
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
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'silo',
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
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
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
    name: 'totalValue',
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
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'enum IVault.ConfigParam',
        name: '_param',
        type: 'uint8'
      },
      {
        internalType: 'bytes',
        name: '_value',
        type: 'bytes'
      }
    ],
    name: 'updateConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'updateTotalValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
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
        name: 'accumulatedUnderlying',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'valueRecord',
    outputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'vaultStage',
    outputs: [
      {
        internalType: 'enum IVault.Stage',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
] as const

export default VaultAbi
