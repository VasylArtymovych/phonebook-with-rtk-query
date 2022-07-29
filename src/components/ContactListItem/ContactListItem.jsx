import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDeleteContactMutation } from 'redux/contactBookApi';
import { Item, Button } from './ContactListItem.styled';

const ContactListItem = ({ id, name, number, createdAt }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <Item>
      {name}: {number}{' '}
      <span>created Date: {new Date(createdAt).toLocaleDateString()}</span>
      <Button
        disabled={isLoading}
        onClick={() => {
          deleteContact(id)
            .then(({ data }) => toast(`${data.name} was deleted`))
            .catch(error => toast.error(error.message));
        }}
      >
        {isLoading ? 'Deleting...' : ' Delete'}
      </Button>
    </Item>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ContactListItem;
