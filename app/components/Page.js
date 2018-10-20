import { Component } from 'react'
import Meta from './Meta'
import Header from './Header'

const Page = (props) => (
  <div>
    <Meta />
    <Header />
    {props.children}
  </div>
)

export default Page
