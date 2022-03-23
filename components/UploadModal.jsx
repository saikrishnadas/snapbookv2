import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { useContext } from 'react'
import ModalContext from '../ModalContext'
import { db, storage } from '../firebase.js'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

function UploadModal() {
  const { data: session } = useSession()
  const { open, openModal, closeModal } = useContext(ModalContext)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const testMode = () => {
    console.log(selectedFile)
  }

  const uploadPost = async () => {
    console.log('Debug 1')
    if (loading) return
    console.log('Debug 2')
    setLoading(true)
    console.log('Debug 3')

    // 1) Create a post and add to firestore "posts" collection
    // 2) Get the post ID for the newly created post
    // 3) Upload the image to firebase storage with the post ID
    // 4) Get a download URL from firebase storage and update the original post (in firestore collection "posts") with image

    //Create a post and add to firestore "posts" collection
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    //Get the post ID for the newly created post
    console.log('New doc add with post ID', docRef.id)

    //Upload the image to firebase storage with the post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    console.log(imageRef)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef) //Get a download URL from firebase storage

        //update the original post (in firestore collection "posts") with image
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        })
      }
    )

    closeModal()
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Post Image
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="file"
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                  <input
                    type="text"
                    placeholder="Enter the caption...."
                    ref={captionRef}
                  />
                </div>

                <div className="mt-4">
                  <button
                    // disabled={!selectedFile}
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={uploadPost}
                  >
                    {loading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UploadModal
