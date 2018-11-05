import Link from 'next/link'
import SingleItem from '../components/SingleItem'

const ItemPage = props => (
  <SingleItem id={props.query.id} />
)

export default ItemPage
