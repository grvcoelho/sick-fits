import Link from 'next/link'
import UpdateItem from '../components/UpdateItem'

const UpdatePage = props => (
  <UpdateItem id={props.query.id} />
)

export default UpdatePage
