import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export const ContactItem = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button
        value={contact.id}
        onClick={() => onDelete(contact.id)}
        className={css.button}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.string,
  onDelete: PropTypes.func,
};
