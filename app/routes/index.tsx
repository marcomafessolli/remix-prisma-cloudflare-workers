import { Link, useLoaderData } from 'remix'
import type { LoaderFunction, MetaFunction } from 'remix'

import { db } from '~/utils/prisma.server'
import type { User } from '@prisma/client'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix + Prisma + Cloudflare Workers',
    description: 'Remix + Prisma + Cloudflare Workers example project',
  }
}

export let loader: LoaderFunction = async () => {
  const users = await db.user.findMany({
    take: 5,
    select: { id: true, name: true },
  })

  return users
}

export default function Index() {
  const users = useLoaderData<User[]>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <main>
        <h2>Users</h2>
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
