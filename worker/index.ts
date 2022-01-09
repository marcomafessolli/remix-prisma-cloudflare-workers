import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'
// @ts-ignore @ts-expect-error
import * as build from '../build/index.js'

const handleRequest = createRequestHandler({ build })

const handleEvent = async (event: FetchEvent) => {
  const { request } = event

  // @ts-ignore
  const cache = caches.default
  const cached = await cache.match(request)

  if (cached) {
    console.log('cache hit')
    return cached
  }

  console.log('cache miss')
  let response = await handleAsset(event, build)

  if (!response) {
    response = await handleRequest(event)
  }

  response = new Response(response.body, response)
  response.headers.append('Cache-Control', 's-maxage=10')

  event.waitUntil(cache.put(request, response.clone()))

  return response
}

addEventListener('fetch', (event: FetchEvent) => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') {
      event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      )
    }

    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})
