import { LoaderFunction, useLoaderData } from 'remix'
import { db } from '~/utils/prisma.server'

type LoaderData = {
  id: string
  name: string
  email: string
}

export let loader: LoaderFunction = async () => {
  const users = await db.user.findMany()
  return users
}

export default function Index() {
  const users = useLoaderData<LoaderData[]>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target='_blank'
            href='https://remix.run/tutorials/blog'
            rel='noreferrer'
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target='_blank'
            href='https://remix.run/tutorials/jokes'
            rel='noreferrer'
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
      </ul>
      <main>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
