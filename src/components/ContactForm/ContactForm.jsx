import React, { useState } from 'react'
import styles from './contactForm.module.css'

const ContactForm = ({ addContact}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  function resetForm () {
    setName('')
    setNumber('')
  }

  function onAddContactClick () {
    if (!name || !number) return
    const contact = {
      id: crypto.randomUUID(),
      name,
      number,
    }
    addContact(contact)
    resetForm()
  }
  return (
    <form className={styles['contact-form']}>
      <div>
        <label htmlFor="name">Name</label>
        <input value={name} type="text" name="name" required onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input value={number} type="tel" name="number" required onChange={(e) => setNumber(e.target.value)}/>
      </div>

      <button className={styles['contact-button']} type="button" onClick={onAddContactClick}>Add</button>
    </form>
  )
}

export default ContactForm