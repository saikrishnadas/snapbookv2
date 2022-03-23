import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import { useContext } from 'react'
import ModalContext from '../ModalContext'
import UploadModal from '../components/UploadModal'

const Home: NextPage = () => {
  const { open, openModal, closeModal } = useContext(ModalContext)
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {open && <UploadModal />}
      <Header />
      <Feed />
    </div>
  )
}

export default Home
