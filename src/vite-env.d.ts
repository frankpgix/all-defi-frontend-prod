/* eslint-disable no-var */
/// <reference types="vite/client" />
declare global {
  interface Window {
    isInTaskSign: boolean
  }
}

declare global {
  var isInTaskSign: boolean
}

export {}
