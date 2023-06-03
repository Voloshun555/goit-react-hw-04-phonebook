import { useState, useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './contactForm/contactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/contactList';
import { Filter } from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id))
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = data => {
    data.id = nanoid();
    const nameToLowerCase = data.name.toLowerCase();
    const contactt = contacts.find(
      contact =>
        contact.name.toLowerCase === nameToLowerCase ||
        contact.number === data.number
    );

    if (contactt) {
      alert(`${data.name} або ${data.number} вже є в телефонній книзі`);
      return;
    } else {
      setContacts(prevState => [...prevState, data]);
    }
  };

  return (
    <div className={css.appDiv}>
      <ContactForm onSubmit={addContact} />
      <h3>Телефонна книга: {contacts.length}</h3>
      <Filter value={filter} onChange={changeFilter} />

      {contacts.length ? (
        <ContactList
          contacts={getVisibleContacts()}
          onDeletContacts={deleteContacts}
        />
      ) : (
        <p>На жаль у тебе не має контактів</p>
      )}
    </div>
  );
}

export default App;

