import { Link, useLoaderData, json } from 'remix'
import type { LoaderFunction, MetaFunction, HeadersFunction } from 'remix'

import { prisma } from '~/utils/prisma.server'
import type { User } from '@prisma/client'

export let meta: MetaFunction = ({ data }: { data: User | undefined }) => {
  if (!data) {
    return {
      title: 'User not found',
      description: 'User not found',
    }
  }

  return {
    title: `User ${data.name}`,
    description: `User ${data.name} details`,
  }
}

export let loader: LoaderFunction = async ({ params }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    })

    return json(user)
  } catch (error) {
    throw new Response('Not Found', {
      status: 404,
    })
  }
}

export let headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=60',
  }
}

export default function Index() {
  const user = useLoaderData<User>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link to='/'>Back to users</Link>
    </div>
  )
}
