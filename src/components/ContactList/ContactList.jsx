import React from 'react'
import styles from './contactList.module.css'

const ContactList = ({ contacts, deleteContact}) => {
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <span>{contact.name}: {contact.number}</span>
          <button className ={styles['list-button']}onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default ContactList