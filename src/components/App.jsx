import React, { Component } from 'react';
import css from './App.module.css';
import ContactForm from './contactForm/contactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/contactList';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = e => {
this.setState({
  filter: e.target.value,
})
  }

  deleteContacts = id =>{
this.setState(prevState => ({
  contacts: prevState.contacts.filter(contact => contact.id !== id),
}))
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = data => {
    data.id = nanoid();
    const nameToLowerCase = data.name.toLowerCase();

    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLowerCase() === nameToLowerCase ||
          contact.number === data.number
      )
    ) {
      alert(`${data.name} або ${data.number} вже є в телефонній книзі`);
      return;
    }
    this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    }));
  };


  componentDidMount () {
   const contacts = localStorage.getItem('contacts')
   const parsedContacts = JSON.parse(contacts);

   if (parsedContacts) {
    this.setState({
      contacts: parsedContacts
     })
    }
   }

   

  componentDidUpdate (setState, prevState) {

if (this.state.contacts !== prevState.contacts) {
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
}

  }


  render() {
    const { contacts, filter } = this.state;
    const visibleFilter = this.getVisibleContacts();

    return (
      <div className={css.appDiv}>
        <ContactForm onSubmit={this.addContact} />
        <h3>Телефонна книга: {contacts.length}</h3>
<Filter value={filter} onChange={this.changeFilter}/>

        {contacts.length ? (
          <ContactList
            contacts={visibleFilter}
            onDeletContacts={this.deleteContacts}
          />
        ) : (
          <p>На жаль у тебе не має контактів</p>
        )}
      </div>
    );
  }
}

export default App;
