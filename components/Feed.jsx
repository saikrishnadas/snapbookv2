import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Feed() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <main
      className={`mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && '!max-w-3xl !grid-cols-1'
      }`}
    >
      <section className="col-span-2">
        {/* <Stories /> */}
        <Posts />
      </section>
      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
            <p className="ml-20 mt-10 font-bold">
              Developed by{' '}
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => router.push('https://www.saikrishnadas.com/')}
              >
                Sai Krishna Das
              </span>
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
