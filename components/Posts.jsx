import Post from "./Post";

const DUMMY_DATA = [
    {
        id:"123",
        username:"sai__0000",
        userImg:"",
        img:"",
        caption: "HEY HELLO WORLD"
    },
    {
        id:"124",
        username:"sai__1111",
        userImg:"",
        img:"",
        caption: "HEY HELLO WORLD 2"
    }
]

function Posts() {
    return (
        <div>
         {DUMMY_DATA.map(post => (
                <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption}/>
            ))}

        </div>
    )
}

export default Posts
