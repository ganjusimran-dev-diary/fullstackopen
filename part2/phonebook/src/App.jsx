import { AddPhoneSection, ViewPhoneSection } from './components/organisms/index'
import { Heading } from './components/atoms/index'
import InputText from './components/atoms/Input';
import usePhonebookHelper from './usePhonebookHelper';

const App = () => {
  const {
    persons,
    loading,
    fetchError,
    filterText,
    onPressAddPerson,
    onPressDeletePhone,
    onChangeFilterValue,
  } = usePhonebookHelper();

  return (
    <div>
      <Heading title='PhoneBook' />
      <InputText
        label='filter shown with'
        placeholder='Enter text to search'
        value={filterText}
        disabled={!!loading}
        onChange={onChangeFilterValue}
      />
      <AddPhoneSection onAddPerson={onPressAddPerson} disabled={!!loading} />
      <ViewPhoneSection
        persons={persons}
        loading={loading}
        filterText={filterText?.toLowerCase()}
        fetchError={fetchError}
        onPressDeletePhone={onPressDeletePhone}
      />
    </div>
  )
}

export default App