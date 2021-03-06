import {
  BookmarkIcon,
  EmojiHappyIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { useSession, signIn } from 'next-auth/react'
import { db } from '../firebase'
import { useState, useEffect, useRef } from 'react'
import Moment from 'react-moment'

function Post({ id, username, userImg, img, caption }) {
  const inputRef = useRef(null)
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setComments(result)
      }
    )
  }, [db, id])

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts', id, 'likes')),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setLikes(result)
        console.log(result)
      }
    )
  }, [db, id])

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (e) => {
    e.preventDefault()
    const commentTOSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentTOSend,
      username: session.user.username,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  return (
    <div className="my-7 rounded-sm border bg-white">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
          alt="user image"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={img} className="w-full object-cover" alt="post image" />
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatIcon
              className="btn"
              onClick={() => inputRef.current && inputRef.current.focus()}
            />
            {/* <PaperAirplaneIcon className="btn" /> */}
          </div>
          {/* <BookmarkIcon className="btn" /> */}
        </div>
      )}

      <p className="truncate p-5">
        {likes.length > 0 && (
          <p className="mb-1 font-bold">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex items-center space-x-2">
              <img
                className="h-7 rounded-full"
                src={comment.profileImg}
                alt="profile image"
              />
              <p className="flex-1 text-sm">
                <span className="mr-2 font-bold">{comment.username}</span>
                {comment.comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session ? (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            className="flex-1 border-none outline-none focus:ring-0"
            placeholder="add a comment..."
            type="text"
            value={comment}
            ref={inputRef}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      ) : (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            disabled={true}
            className="w-60 border-none outline-none focus:ring-0"
            placeholder="Login to Like and Comment"
            type="text"
          />
          <button
            onClick={signIn}
            className="font-semibold text-blue-500 underline hover:text-blue-700"
          >
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
