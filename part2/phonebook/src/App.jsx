import { useState } from 'react'
import { AddPhoneSection, Form, ViewPhoneSection } from './components/organisms/index'
import { Heading } from './components/atoms/index'
import InputText from './components/atoms/Input';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]);
  const [filterText, setFilterText] = useState('');

  const onChangeFilterValue = (event) => {
    setFilterText(event.target.value);
  }

  return (
    <div>
      <Heading title='PhoneBook' />
      <InputText
        label='filter shown with'
        placeholder='Enter text to search'
        value={filterText}
        onChange={onChangeFilterValue}
      />
      <AddPhoneSection setPersons={setPersons} />
      <ViewPhoneSection persons={persons} filterText={filterText?.toLowerCase()} />
    </div>
  )
}

export default App