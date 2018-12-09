import { IFilesDispatch, useFiles } from '../reducers'
import { IPayload, IResponse, Resolver } from '../types'

export const resolver = (resolve: Resolver, reject: Resolver) => (
  response: IResponse,
) => {
  if (response.status < 400) {
    resolve(response.body)
  } else {
    reject(response.statusText)
  }
}

export const sendMessage = <REQ>(
  type: string,
  payload: IPayload<REQ>,
): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type, payload }, resolver(resolve, reject))
  })

export const getValue = (hash: string): Promise<string> =>
  sendMessage<{ hash: string }>('getValue', { payload: { hash } })

export const addValue = (value: string): Promise<string> =>
  sendMessage('addValue', { payload: { value } })
