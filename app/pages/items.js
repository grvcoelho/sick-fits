import Link from 'next/link'
import Items from '../components/Items'

const ItemsPage = (props) => (
  <Items page={Number(props.query.page) || 1} />
)

export default ItemsPage
