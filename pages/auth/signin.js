import { useState,useEffect } from "react";

import {getProviders,signIn as signIntoProvider} from "next-auth/react"

function signIn() {
    const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
    return (
<>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIntoProvider(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
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
