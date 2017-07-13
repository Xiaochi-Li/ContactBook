import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import {Route} from 'react-router-dom'

class App extends Component {
  state = {
    screen : 'list',
    contacts :[]
  }

  // load external data here
  componentDidMount(){
    ContactsAPI.getAll().then((contacts) =>{
      this.setState({
        contacts:contacts
      })
    })
  }

  removeContact = (contact) => {
    this.setState((previouState) =>({
      contacts:this.state.contacts.filter(
        (eachContact) => eachContact.id !== contact.id
      )}))
  ContactsAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    const {contacts} = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() =>(<ListContacts
          onDeleteContact={this.removeContact}
          contacts = {contacts}/>
        )} />

        <Route path="/create" render={({history}) =>(
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              console.log(contact)
              //push the / url to hisory object so it jump back to the main page
              //after creating a new contact
              history.push('/')
            }}
          />
         )} />
      </div>
    );
  }
}

export default App;
