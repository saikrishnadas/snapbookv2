import { useState, useEffect } from 'react'
import HeaderLogin from '../../components/HeaderLogin.jsx'
import { getProviders, signIn as signIntoProvider } from 'next-auth/react'
import logo from '../../public/signinlogo.svg'
import { HandIcon } from '@heroicons/react/outline'

function signIn() {
  const [providers, setProviders] = useState(null)
  const [signup, setSignup] = useState(false)

  const createAccount = () => {
    setSignup(true)
  }

  useEffect(async () => {
    const res = await getProviders()
    setProviders(res)
  }, [])

  return (
    <>
      <HeaderLogin />
      <div className="flex max-h-screen flex-col items-center justify-center py-2 px-14 text-center">
        {signup ? (
          <>
            {' '}
            <div className="h-14" />
            <div className="rounded-lg border-2 border-[#E65C64] p-10 shadow-lg">
              <h1 className="text-2xl font-semibold">Create account</h1>
              <div className="mb-6 mt-10 md:items-center">
                <form>
                  <div className="md:w-52">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-[#E65C64] focus:bg-white focus:outline-none"
                      id="inline-full-name"
                      type="text"
                      placeholder="Enter a username"
                    />
                  </div>
                  <div className="mt-5 md:w-52">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-[#E65C64] focus:bg-white focus:outline-none"
                      id="inline-full-name"
                      type="text"
                      placeholder="Enter a email"
                    />
                  </div>
                  <div className="mt-5 md:w-52">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-[#E65C64] focus:bg-white focus:outline-none"
                      id="inline-full-name"
                      type="text"
                      placeholder="Enter a password"
                    />
                  </div>
                  <button className="mt-5 p-2 text-blue-500 hover:rounded-lg hover:bg-blue-500 hover:text-white hover:transition">
                    Create a account
                  </button>
                  <div>
                    <p>Or</p>
                  </div>
                </form>
                <button
                  onClick={(signIn) => setSignup(!signIn)}
                  className="mt-2 p-2 text-blue-500 hover:rounded-lg hover:bg-gray-500 hover:text-white hover:transition"
                >
                  Sign In
                </button>
              </div>
            </div>{' '}
          </>
        ) : (
          <>
            {' '}
            <div className="h-14" />
            <div className="rounded-lg border-2 border-[#E65C64] p-10 shadow-lg">
              <h1 className="text-2xl font-semibold">Sign In</h1>
              <div className="mt-10 mb-10">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      <button
                        className="rounded-lg bg-blue-500 p-3 text-white"
                        onClick={() =>
                          signIntoProvider(provider.id, { callbackUrl: '/' })
                        }
                      >
                        Sign in with {provider.name}
                      </button>
                    </div>
                  ))}
              </div>
              <h1 className="">or sign in with your username</h1>
              <div className="mb-6 mt-10 md:items-center">
                <form>
                  <div className="md:w-52">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-[#E65C64] focus:bg-white focus:outline-none"
                      id="inline-full-name"
                      type="text"
                      placeholder="username"
                    />
                  </div>
                  <div className="mt-5 md:w-52">
                    <input
                      className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-[#E65C64] focus:bg-white focus:outline-none"
                      id="inline-full-name"
                      type="text"
                      placeholder="password"
                    />
                  </div>
                  <button className="mt-2 p-2 text-blue-500 hover:rounded-lg hover:bg-blue-500 hover:text-white hover:transition">
                    Sign In
                  </button>
                  <div>
                    <p>Or</p>
                  </div>
                </form>
                <button
                  onClick={createAccount}
                  className="p-2 text-blue-500 hover:rounded-lg hover:bg-gray-400 hover:text-white hover:transition"
                >
                  Create a account
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// export async function getSeverSideProps(){
//     const providers = await getProviders();

//     return {
//         props:{
//             providers
//         }
//     }
// }

export default signIn
