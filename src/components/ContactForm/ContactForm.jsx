import { Component } from 'react'
import styles from './contactForm.module.css'

class ContactForm extends Component  {
  state = {
    name: '',
    number: ''
  }

  resetForm = () => {
    this.setState({
      name: '',
      number: ''
    })
  }

  onAddContactClick = () => {
    if (!this.state.name || !this.state.number) return
    const contact = {
      id: crypto.randomUUID(),
      name: this.state.name,
      number: this.state.number,
    }
    this.props.addContact(contact)
    this.resetForm()
  }

  onChange = (e, property) => {
    this.setState({
      [property]: e.target.value
    })
  }

  render () {
    return (
      <form className={styles['contact-form']}>
      <div>
        <label htmlFor="name">Name</label>
        <input value={this.state.name} type="text" name="name" required onChange={(e) => this.onChange(e, 'name')}/>
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input value={this.state.number} type="tel" name="number" required onChange={(e) => this.onChange(e, 'number')}/>
      </div>

      <button className={styles['contact-button']} type="button" onClick={this.onAddContactClick}>Add</button>
    </form>
    )
  }
}

export default ContactForm