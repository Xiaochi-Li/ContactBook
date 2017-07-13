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

  navigateToCreate = () =>{
    this.setState({
      screen:'create'
    })
  }

  render() {
    const {screen, contacts} = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() =>(<ListContacts
          onDeleteContact={this.removeContact}
          onNavigate={this.navigateToCreate}
          contacts = {contacts}/>
        )} />

        <Route path="/create" render={() =>(
          <CreateContact
          />
          )}
        />
      </div>
    );
  }
}

export default App;
