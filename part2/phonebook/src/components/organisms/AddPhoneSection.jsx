import { Form } from "./index";
import { Heading } from "../atoms/index";

const AddPhoneSection = ({ onAddPerson = () => {}, disabled = false }) => {
  const onPressAdd = (name, number) => {
    onAddPerson({ name, number });
  };

  return (
    <div>
      <Heading title="add a new" />
      <Form submitText="add" disabled={disabled} onSubmit={onPressAdd} />
    </div>
  );
};

export default AddPhoneSection;
