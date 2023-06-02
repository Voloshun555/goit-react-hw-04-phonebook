import PropTypes from 'prop-types';
import css from './contactList.module.css'

export const ContactList = ({ contacts, onDeletContacts }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={css.list}>
          <p>
            {name}: {number}
          </p>
          <button type="button" onClick={() => onDeletContacts(id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeletContacts: PropTypes.func.isRequired,
};