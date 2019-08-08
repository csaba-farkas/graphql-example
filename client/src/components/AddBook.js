import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery
    if (data.loading) {
      return <option disabled>Loading...</option>
    }

    return data.authors.map(a => {
      return (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      )
    })
  }

  submitForm = e => {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form className="add-book" onSubmit={e => this.submitForm(e)}>
        <div className="field">
          <label htmlFor="">Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="">Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="">Author</label>
          <select
            name=""
            id=""
            onChange={e => this.setState({ authorId: e.target.value })}
          >
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
