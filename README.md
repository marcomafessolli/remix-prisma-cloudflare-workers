x# Remix + Cloudflare Workers + Prisma!

- [Remix Docs](https://remix.run/docs)

## Live Demo

- [Demo](https://remix-cloudflare-workers.marcomafessolli.workers.dev)

## Setup

Before starting, make sure you have the following:

* `node >= 16`
* A Prisma Data Proxy account
* Followed [Deploying to Cloudflare Workers](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) documentation and did steps 2, 6 and 7
* A `.env` file with `DATABASE_URL` that points to your prisma data proxy account

For more information, visit [this](https://www.prisma.io/docs/concepts/data-platform/data-proxy#edge-runtimes)

After that, run:

* `npm install`

Edge functions cannot access files in the file system which prevents Prisma to load values from `.env`, so it is necessary to set up a wrangler secret by using wrangler's CLI or the dashboard.

```sh
$ wrangler secret put DATABASE_URL
```

And finally, generate a new Prisma Client by running:

* `npm run generate-client`

Check [Prisma and Cloudflare](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) for more information.

## Development

```sh
$ npm run dev
```

And then check `http://127.0.0.1:8787`. You're ready 💇‍♂️

## Deployment

```sh
npm run deploy
```
