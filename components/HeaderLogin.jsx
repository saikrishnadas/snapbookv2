import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import { useSession, signOut, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import ModalContext from '../ModalContext'
import snapbookImg from '../public/snapbook.png'
import logo from '../public/logo.svg'

function HeaderLogin() {
  const { data: session } = useSession()
  const router = useRouter()
  const { open, openModal, closeModal } = useContext(ModalContext)

  console.log(session)
  return (
    <div className="top-0 z-50 border-b bg-white pt-2 pb-2 shadow-sm">
      <div className="mx-5 flex max-w-6xl justify-between xl:mx-auto">
        <div
          className="relative hidden w-40 cursor-pointer text-xl lg:inline-grid"
          onClick={() => router.push('/')}
        >
          <div
            className="relative mt-1 hidden h-14 w-20 cursor-pointer text-xl lg:inline-grid"
            onClick={() => router.push('/')}
          >
            <Image src={logo.src} layout="fill" objectFit="contain" />
          </div>

          <Image src={snapbookImg.src} layout="fill" objectFit="cover" />
        </div>
        <div
          onClick={() => router.push('/')}
          className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden"
        >
          <Image src={logo.src} layout="fill" objectFit="contain" />
        </div>

        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              {/* <SearchIcon className="h-5 w-5 text-gray-500" /> */}
            </div>
            {/* <input
              className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
              type="text"
              placeholder="Search"
            /> */}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          {/* <MenuIcon className="h-10 w-10 cursor-pointer md:hidden" /> */}
          {session ? (
            <>
              {' '}
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-2 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-sm text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" onClick={() => openModal()} />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user?.image}
                alt="profile picture"
                className="h-10 w-10 cursor-pointer rounded-full"
              />
            </>
          ) : (
            <button
              onClick={signIn}
              className="rounded-lg bg-blue-500 p-2 text-white hover:rounded-lg hover:bg-blue-800 hover:transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderLogin
