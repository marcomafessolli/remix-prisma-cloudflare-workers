import { handleEvent } from './request'


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
