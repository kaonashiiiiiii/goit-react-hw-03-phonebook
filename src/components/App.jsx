import { useEffect, useMemo, useRef, useState } from "react";
import { ContactForm, FilterForm, Section, ContactList } from "."

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: ''
  })

  const rendersCausedByContacts = useRef(0)

  useEffect(() => {
    const contacts = localStorage.getItem('contacts')
    if (contacts) {
      setState((prevState) => ({
        ...prevState,
        contacts: JSON.parse(contacts)
      }))
    }
  }, [])

  useEffect(() => {
    // to skip setting empty array on initial render
    if (rendersCausedByContacts.current === 0) {
      rendersCausedByContacts.current += 1
      return
    }

    localStorage.setItem('contacts', JSON.stringify(state.contacts))
  }, [state.contacts])

  function deleteContact (id) {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(item => item.id !== id)
    }))
    localStorage.setItem('contacts', JSON.stringify(state.contacts))
  }

  function checkContact (contact) {
    const isContantExist = state.contacts.find(item => item.name === contact.name)
    if (isContantExist) {
      alert (`${contact.name} is already in contacts`)
      return false
    }
    return true
  }

  function addContact (contact) {
    if (!checkContact(contact)) return
    setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, contact]
    }))
    localStorage.setItem('contacts', JSON.stringify(state.contacts))
  }

  const filteredContacts = useMemo(function () {
    return state.contacts.filter(contact => {
      if(!state.filter) return true
      if (contact.name.toLowerCase().includes(state.filter)) return true
      return false
    })
  }, [state.filter, state.contacts])

  function setFilter (filter) {
    setState(prevState => ({
      ...prevState,
      filter
    }))
  }
  console.log(filteredContacts)
  return (
    <div>
      <Section title="Phonebook">
        <ContactForm addContact={addContact}/>
      </Section>
      <Section title="Contacts">
        <FilterForm filter={state.filter} setFilter={setFilter}/>
        <ContactList contacts={filteredContacts} deleteContact={deleteContact}/>
      </Section>
    </div>
  );
};
