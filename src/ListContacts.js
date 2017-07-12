import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component{
  
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query:''
  }

  updateQuery = (queryString) =>{
    this.setState({
      query: queryString.trim()//to trim any extra white space of user input
    })
  }

  resetQuery = () =>{
    this.setState({
      query: ''
    })
  }

  render(){
    //ES6 to destructure object
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts
    //if this.state.query is not empty
    if (query){
      //
      const match =  new RegExp(escapeRegExp(query), 'i')
      showingContacts =  contacts.filter((contact)=>(match.test(contact.name)))
      console.log(showingContacts)
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return(
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>


        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button
              onClick ={() =>this.resetQuery()}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) =>(
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={
                {backgroundImage: `url(${contact.avatarURL})`}
              }/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className='contact-remove'>
                Remove
              </button>
            </li>))
          }
        </ol>
      </div>
    )
  }
}

export default ListContacts
