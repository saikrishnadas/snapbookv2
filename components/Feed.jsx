import Stories from './Stories'
import Posts from "./Posts"

function Feed() {
  return (
    <main className="grid-col-1 xl:grid-col-3 mx-auto grid md:max-w-3xl md:grid-cols-2 xl:max-w-6xl">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section></section>
    </main>
  )
}

export default Feed
