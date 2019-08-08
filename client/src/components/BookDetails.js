import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  render() {
    const { book } = this.props.data
    const content = book ? (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map(b => {
            return <li key={b.id}>{b.name}</li>
          })}
        </ul>
      </div>
    ) : (
      <div>No book selected</div>
    )
    return <div id="book-details">{content}</div>
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.selectedBookId
      }
    }
  }
})(BookDetails)
