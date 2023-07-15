const urlTable: Record<string, { web: string }> = {
  dev: {
    web: 'https://chip-web-fe.vercel.app/'
  },
  prod: {
    web: ''
  },
  pre: {
    web: ''
  }
}

const { NODE_ENV } = import.meta.env
export const getEnv = (): string => {
  if (NODE_ENV === 'development') return 'dev'
  return (
    Object.keys(urlTable).find((i) => JSON.stringify(urlTable[i]).includes(window.location.host)) ??
    'prod'
  )
}

export default getEnv
