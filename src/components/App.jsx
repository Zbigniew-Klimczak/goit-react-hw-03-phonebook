import { Component } from 'react';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import css from './App.module.css';
export class App extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      filter: '',
    };
  }
  filterValueChange = evt => {
    this.setState({ filter: evt.currentTarget.value.trim() });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const keyword = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().indexOf(keyword) > -1
    );
    return filteredContacts;
  };
  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  deleteContact = contactToDelete => {
    const { contacts } = this.state;
    let newContacts = contacts.filter(contact => contact !== contactToDelete);
    this.setState({ contacts: newContacts });
  };
  render() {
    const { filter, contacts } = this.state;
    return (
      <section className={css.phonebook}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          addContact={this.addContact}
        ></ContactForm>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter filterValue={filter} onChange={this.filterValueChange}></Filter>
        <ContactList
          deleteContact={this.deleteContact}
          filteredContacts={this.filteredContacts}
        ></ContactList>
      </section>
    );
  }
}
