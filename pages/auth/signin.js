import { useState, useEffect } from 'react'
import Header from '../../components/Header.jsx'
import { getProviders, signIn as signIntoProvider } from 'next-auth/react'
import logo from '../../public/signinlogo.svg'

function signIn() {
  const [providers, setProviders] = useState(null)

  useEffect(async () => {
    const res = await getProviders()
    setProviders(res)
  }, [])
  return (
    <>
      <Header />
      <div className="relative -mt-56 flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
        <img src={logo.src} alt="" className="absolute w-64" />
        <div className="mt-40">
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
