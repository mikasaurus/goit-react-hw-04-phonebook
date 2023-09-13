import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { FilterContact } from './FilterContact/FilterContact';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (newName, newNumber) => {
    const existingContact = contacts
      .map(contact => contact.name)
      .includes(newName, newNumber);

    if (existingContact) {
      alert(`${newName} is already in contacts.`);
    } else {
      setContacts(prevState => [
        ...prevState,
        { name: newName, number: newNumber, id: nanoid() },
      ]);
    }
  };

  const filterChange = event => setFilter(event.target.value);

  const deleteContact = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    setContacts(JSON.parse(savedContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h2 className={css.header}>Phonebook</h2>
      <ContactForm onSubmit={addContact} />
      <h3 className={css.header}>Contacts</h3>
      <FilterContact inputChange={filterChange} filter={filter} />
      <ContactList
        contacts={contacts}
        onDelete={deleteContact}
        filter={filter}
      />
    </div>
  );
};
