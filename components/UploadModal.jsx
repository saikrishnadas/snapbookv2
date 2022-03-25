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
import { CameraIcon } from '@heroicons/react/outline'

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
      <Transition.Root appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 sm:scale-95 translate-y-4 sm:translate-y-0"
              enterTo="opacity-100 sm:scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      className="w-full cursor-pointer object-contain"
                      onClick={() => setSelectedFile(null)}
                      alt=""
                    />
                  ) : (
                    <div
                      className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-100"
                      onClick={(e) => filePickerRef.current.click()}
                    >
                      <CameraIcon
                        className="h-6 w-6 text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload a Image
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <input
                      className="w-full border-none text-center focus:ring-0"
                      type="text"
                      placeholder="Please enter a caption..."
                      ref={captionRef}
                    />
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={!selectedFile}
                      type="button"
                      onClick={uploadPost}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300 sm:text-sm"
                    >
                      {loading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default UploadModal
