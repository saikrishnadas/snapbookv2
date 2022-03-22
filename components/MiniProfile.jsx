import { signOut, useSession } from 'next-auth/react'

function MiniProfile() {
  const { data: session } = useSession()

  return (
    <div className="mt-14 ml-10 flex items-center justify-between">
      <img
        src={session?.user?.image}
        alt=""
        className="h-16 w-16 rounded-full border p-[2px]"
      />

      <div className="mt-4 flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to snapbook v2</h3>
      </div>

      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
