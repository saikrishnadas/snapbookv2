import Stories from './Stories'

function Feed() {
  return (
    <main className="grid-col-1 xl:grid-col-3 max-auto grid md:max-w-3xl md:grid-cols-2 xl:max-w-6xl">
      <section className="col-span-2">
        <Stories />
      </section>
      <section></section>
    </main>
  )
}

export default Feed
