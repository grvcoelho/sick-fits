import { Fragment } from 'react'
import Link from 'next/link'
import SingleItem from '../components/SingleItem'

const ItemPage = props => (
  <Fragment>
    <SingleItem id={props.query.id} />
  </Fragment>
)

export default ItemPage
