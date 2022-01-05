import { createEventHandler } from '@remix-run/cloudflare-workers'
// @ts-ignore @ts-expect-error
import * as build from '../build/index.js'

addEventListener('fetch', createEventHandler({ build }))
