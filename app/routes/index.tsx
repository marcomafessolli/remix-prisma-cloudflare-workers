import { Link, useLoaderData, json } from 'remix'
import type { LoaderFunction, MetaFunction } from 'remix'

import { prisma } from '~/utils/prisma.server'
import type { User } from '@prisma/client'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix + Prisma + Cloudflare Workers',
    description: 'Remix + Prisma + Cloudflare Workers example project',
  }
}

export let loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany({
    take: 5,
    select: { id: true, name: true },
  })

  return json(users)
}

export default function Index() {
  const users = useLoaderData<User[]>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Users</h1>
      <main>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`} prefetch='intent'>
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
