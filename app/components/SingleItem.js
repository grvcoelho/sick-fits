import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Head from 'next/head'
import ErrorMessage from './ErrorMessage'

const SingleItemStyled = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`

class SingleItem extends Component {
  render () {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({ error, loading, data }) => {
          const { item } = data

          if (error) return <ErrorMessage error={error} />
          if (loading) return <p>Loading...</p>
          if (!item) return <p>No item found for {this.props.id}</p>

          return (
            <SingleItemStyled>
              <Head>
                <title>{item.title} | Sick Fits</title>
              </Head>

              <img src={item.largeImage} alt={item.title} />

              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyled>
          )
        }}
      </Query>
    )
  }
}

export default SingleItem
