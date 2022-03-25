import Post from './Post'
import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore'
import { db } from '../firebase'

// const DUMMY_DATA = [
//   {
//     id: '123',
//     username: 'sai__0000',
//     userImg: '',
//     img: '',
//     caption: 'HEY HELLO WORLD',
//   },
//   {
//     id: '124',
//     username: 'sai__1111',
//     userImg: '',
//     img: '',
//     caption: 'HEY HELLO WORLD 2',
//   },
// ]

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPosts(result)
      }
    )
  }, [db])

  return (
    <>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.profileImg}
            img={post.image}
            caption={post.caption}
          />
        ))}
      </div>
      <p className="ml-20 mt-10 font-bold md:hidden">
        Developed by{' '}
        <span
          className="cursor-pointer text-blue-500"
          onClick={() => router.push('https://www.saikrishnadas.com/')}
        >
          Sai Krishna Das
        </span>
      </p>
    </>
  )
}

export default Posts
