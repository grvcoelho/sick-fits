import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREAT_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ){
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 100,
  }

  handleChange = (e) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value): value
    this.setState({ [name]: val })
  }

  handleSubmit = createItem => async (e) => {
    e.preventDefault()

    const res = await createItem()

    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id }
    })
  }

  uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])

    // This is the upload_preset set on Cloudnary
    data.append('upload_preset', 'sick-fits')

    const res = await fetch('https://api.cloudinary.com/v1_1/dt3pklcrm/image/upload', {
      method: 'POST',
      body: data,
    })

    const file = await res.json()

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  render () {
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, payload) => {
          const { loading, error } = payload

          return (
            <Form onSubmit={this.handleSubmit(createItem)}>
              <ErrorMessage error={error} />

              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Upload an image"
                    required
                    onChange={this.uploadImage}
                  />
                  {this.state.image && (
                    <img width="200" src={this.state.image} alt="Upload Preview" />
                  )}
                </label>

                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="description">
                  Description
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter a description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>

                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default CreateItem
