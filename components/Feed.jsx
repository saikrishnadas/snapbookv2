import Stories from './Stories'
import Posts from "./Posts"
import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"

function Feed() {
  return (
    <main className="grid-cols-1 xl:grid-cols-3 mx-auto grid md:max-w-3xl md:grid-cols-2 xl:max-w-6xl">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden xl:inline-grid md:col-span-1">
      {/* <div className="fixed top-20"> */}
      <MiniProfile />
        <Suggestions />
      {/* </div> */}

      </section>
    </main>
  )
}

export default Feed
