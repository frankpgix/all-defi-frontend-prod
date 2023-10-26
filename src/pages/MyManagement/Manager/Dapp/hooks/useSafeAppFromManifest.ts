import { useEffect, useMemo } from 'react'
import { Errors, logError } from '../exceptions'
import { fetchSafeAppFromManifest } from '../services/manifest'
import useAsync from './useAsync'
import { getEmptySafeApp } from '../utils/utils'
import type { SafeAppDataWithPermissions } from '../utils/types'
import { asError } from '../exceptions/utils'

type UseSafeAppFromManifestReturnType = {
  safeApp: SafeAppDataWithPermissions
  isLoading: boolean
}

const useSafeAppFromManifest = (
  appUrl: string,
  chainId: string
): UseSafeAppFromManifestReturnType => {
  const [data, error, isLoading] = useAsync<SafeAppDataWithPermissions>(() => {
    if (appUrl && chainId) return fetchSafeAppFromManifest(appUrl, chainId)
  }, [appUrl, chainId])

  const emptyApp = useMemo(() => getEmptySafeApp(appUrl), [appUrl])

  useEffect(() => {
    if (!error) return
    logError(Errors._903, `${appUrl}, ${asError(error).message}`)
  }, [appUrl, error])

  return { safeApp: data || emptyApp, isLoading }
}

export { useSafeAppFromManifest }
