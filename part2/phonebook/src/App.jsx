import {
  AddPhoneSection,
  ViewPhoneSection,
} from "./components/organisms/index";
import { Heading, Notification } from "./components/atoms/index";
import InputText from "./components/atoms/Input";
import usePhonebookHelper from "./usePhonebookHelper";

const App = () => {
  const {
    persons,
    loading,
    fetchError,
    filterText,
    notification,
    onPressAddPerson,
    onPressDeletePhone,
    onChangeFilterValue,
    onClearNotification,
  } = usePhonebookHelper();

  return (
    <div>
      <Heading title="PhoneBook" />
      <Notification
        show={notification?.message}
        message={notification?.message}
        type={notification?.type}
        onClearNotification={onClearNotification}
      />
      <InputText
        label="filter shown with"
        placeholder="Enter text to search"
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
  );
};

export default App;
