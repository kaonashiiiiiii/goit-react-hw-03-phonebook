import { Component  } from "react";
import { ContactForm, FilterForm, Section, ContactList } from "."

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount () {
    const inititalContacts = localStorage.getItem('contacts')
    this.setState({
      contacts: JSON.parse(inititalContacts)
    })
  }

  componentDidUpdate(_, prevState) {
    console.log('prevState', prevState);
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter(item => item.id !== id)
    })
  }

  checkContact = (contact) => {
    const isContantExist = this.state.contacts.find(item => item.name === contact.name)
    if (isContantExist) {
      alert (`${contact.name} is already in contacts`)
      return false
    }
    return true
  }

  addContact = (contact) => {
    if (!this.checkContact(contact)) return
    this.setState({
      contacts: [...this.state.contacts, contact]
    })
  }

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact => {
      if(!this.state.filter) return true
      if (contact.name.toLowerCase().includes(this.state.filter)) return true
      return false
    })
  }

  setFilter = (filter) => {
    this.setState({
      filter
    })
  }
  
  render () {
    const filteredContacts = this.getFilteredContacts()
    return (
      <div>
      <Section title="Phonebook">
        <ContactForm addContact={this.addContact}/>
      </Section>
      <Section title="Contacts">
        <FilterForm filter={this.state.filter} setFilter={this.setFilter}/>
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact}/>
      </Section>
    </div>
    )
  }
};
