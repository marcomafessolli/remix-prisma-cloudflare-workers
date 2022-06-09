import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'

import * as build from '@remix-run/dev/server-build'

export const handleRequest = createRequestHandler({ build })

export const handleEvent = async (event: FetchEvent) => {
  let response = await handleAsset(event, build)

  if (!response) {
    response = await handleRequest(event)
  }

  return response
}
