# Remix + Cloudflare Workers + Prisma!

- [Remix Docs](https://remix.run/docs)

## Live Demo

- [Demo](https://remix-cloudflare-workers.marcomafessolli.workers.dev)

## Setup

Before starting, make sure you have the following:

* `node >= 16`
* A Prisma Data Proxy account
* Followed steps [#6](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#6-create-repository-and-push-to-github) and [#7](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#7-importing-your-project-into-the-prisma-data-platform) at [Prisma and Cloudflare](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) documentation
* A `.env` file with `DATABASE_URL` that points to your prisma data proxy account 

After that, do the following:

* `npm install`
* `PRISMA_CLIENT_ENGINE_TYPE=dataproxy npx prisma generate`

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
