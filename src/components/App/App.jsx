import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title } from './App.styled';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactLIst';
import Filter from 'components/Filter';
import { Box } from 'components/Box/Box';
import Spinner from 'components/Spinner/Spinner';
import { useGetContactsQuery } from 'redux/contactBookApi';
import { setfilter } from 'redux/filterSlice';

const App = () => {
  const {
    data: contacts,
    error,
    isLoading,
    isError,
  } = useGetContactsQuery('', {
    skip: false,
    // refetchOnFocus: true,
  });
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterInput = event => {
    const { value } = event.target;
    dispatch(setfilter(value));
  };

  const filterContacts = () => {
    if (contacts && contacts.length !== 0) {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter)
      );
    }
    return [];
  };

  const filteredContacts = filterContacts();

  return (
    <Box display="flex" justifyContent="center">
      <ToastContainer autoClose={2000} />
      <Container>
        <Title>Phonebook</Title>
        <ContactForm />

        <Title>Contacts</Title>
        <Box display="flex" justifyContent="space-between">
          <Filter value={filter} onChange={handleFilterInput} />
          <h3>Total contacts: {filteredContacts.length}</h3>
        </Box>

        {isError && (
          <Title>
            Status:{error.status} {error.data}
          </Title>
        )}
        {isLoading && Spinner}
        {!isLoading && !isError && <ContactList contacts={filteredContacts} />}
      </Container>
    </Box>
  );
};

export default App;
