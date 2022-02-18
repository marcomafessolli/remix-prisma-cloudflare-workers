import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'

// @ts-ignore @ts-expect-error
import * as build from '../build'

export const handleRequest = createRequestHandler({ build })

export const handleEvent = async (event: FetchEvent) => {
  let response = await handleAsset(event, build)

  if (!response) {
    response = await handleRequest(event)
  }

  return response
}
