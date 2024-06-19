import { isEmpty } from 'lodash'

import { API_PREFIX_URL } from '@/config'
import cache from '@/utils/cache'

interface HttpResponse extends Response {
  data: any
  msg: string
  code: number
  [key: string]: any
}

// get request parameters
const combineUrl = (url: string, params: Record<string, unknown> | undefined) => {
  if (params) {
    const paramsArr = Object.keys(params).map(
      (key) => `${key}=${encodeURIComponent(params[key] as string)}`
    )
    if (url.search(/\?/) === -1)
      return typeof params === 'object' ? `${url}?${paramsArr.join('&')}` : url
    return `${url}&${paramsArr.join('&')}`
  }
  return url
}

// the request timed out - promise
// const controller = new AbortController()
// const timedOutPromise = (delay: number): Promise<Response> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const response = new Response(
//         JSON.stringify({
//           code: 500,
//           msg: 'timed-out',
//           data: null
//         })
//       )
//       resolve(response)
//       // controller.abort()
//     }, delay)
//   })
// }

// whether it is an external link
export const externalLink = (url: string): { pathUrl: string; isExternal: boolean } => {
  const host = /^https?:\/\/([a-zA-Z]*)(\w)+/
  const isExternal = host.test(url)
  return {
    pathUrl: isExternal ? url : `${API_PREFIX_URL}${url}`,
    isExternal
  }
}

export async function http(request: Request): Promise<HttpResponse> {
  // { signal: controller.signal }
  // return Promise.race([timedOutPromise(6000), fetch(request)])
  return Promise.race([fetch(request)])
    .then(async (res) => {
      const json = await res.json()
      return json
    })
    .catch((error) => {
      console.info(error)
      return Promise.reject(error)
    })
}

export async function get(
  path: string,
  params?: Record<string, unknown>,
  args?: RequestInit
): Promise<HttpResponse> {
  const { pathUrl, isExternal } = externalLink(path)
  const _path = combineUrl(pathUrl, params)
  const headers = new Headers()
  if (!isExternal) {
    headers.append('Authorization', `${cache.get('Authorization')}`)
  }
  return await http(new Request(_path, { ...args, method: 'get', headers }))
}

export async function post(
  path: string,
  body?: Record<string, unknown>,
  args?: RequestInit
): Promise<HttpResponse> {
  const { pathUrl, isExternal } = externalLink(path)
  const headers = new Headers()
  const _body = isEmpty(body) ? '' : JSON.stringify(body)
  headers.append('Content-Type', 'application/json;charset=UTF-8')
  if (!isExternal) {
    headers.append('Authorization', `${cache.get('Authorization')}`)
  }
  return await http(
    new Request(pathUrl, {
      ...args,
      method: 'post',
      mode: 'cors',
      body: _body,
      headers
    })
  )
}

export async function formDataPost(
  path: string,
  body: Record<string, any>,
  args?: RequestInit
): Promise<HttpResponse> {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key])
  })

  return await http(
    new Request(externalLink(path).pathUrl, {
      ...args,
      method: 'post',
      mode: 'cors',
      body: formData
    })
  )
}
