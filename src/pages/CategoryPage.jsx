import { useParams } from 'react-router-dom'
import DataPage from './DataPage.jsx'

function CategoryPage() {
  const { slug } = useParams()
  return <DataPage type="kategoria" categorySlug={slug} />
}

export default CategoryPage
