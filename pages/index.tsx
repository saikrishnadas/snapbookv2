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
        <title>Snapbook</title>
        <meta
          name="description"
          content="Snapbook is a social media platform where you could share images and make friends. This is an updated version of snapbook (v2), unlike the old snapbook, this version has a updated user interface, better technology, more features and security. The data shared to snapbook is highly secured as we user firebase storage system and next-auth to protect the user data. Snapbook has a moderating content feature where any image that is offensive can't be posted. So that this platform is safer for childerns too. You could post images, like images and also comment your views on it."
        />
        <link rel="icon" type="image/x-icon" href="/logo.ico" />
      </Head>
      {open && <UploadModal />}
      <Header />
      <Feed />
    </div>
  )
}

export default Home
