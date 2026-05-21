import AuthedLayout from '../layouts/AuthedLayout.jsx'

function SimplePage({ title }) {
  return (
    <AuthedLayout>
      <section className="simple-page">
        <h1>{title}</h1>
      </section>
    </AuthedLayout>
  )
}

export default SimplePage
