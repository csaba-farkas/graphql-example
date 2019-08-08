import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBookId: null
    }
  }
  displayBooks = () => {
    let data = this.props.data

    if (data.loading) {
      return <div>Loading books...</div>
    }

    return data.books.map(b => {
      return (
        <li key={b.id} onClick={() => this.setState({ selectedBookId: b.id })}>
          {b.name}
        </li>
      )
    })
  }
  render() {
    const content = this.displayBooks()

    return (
      <div>
        <ul id="book-list">{content}</ul>
        <BookDetails selectedBookId={this.state.selectedBookId} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
