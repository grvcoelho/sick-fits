import { Fragment } from 'react'
import Link from 'next/link'
import UpdateItem from '../components/UpdateItem'

const UpdatePage = props => (
  <Fragment>
    <UpdateItem id={props.query.id} />
  </Fragment>
)

export default UpdatePage
