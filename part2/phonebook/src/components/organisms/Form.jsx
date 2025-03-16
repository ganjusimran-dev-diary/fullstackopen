import { useState } from "react";
import { Button } from "../atoms";
import InputText from "../atoms/Input";

const Form = ({ submitText = '', onSubmit = () => { }, disabled = false }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const onChangeValue = (event, type = 'name') => {
        if (type === 'name') {
            setNewName(event.target.value);
        } else {
            setNewNumber(event.target.value);
        }
    };

    const onPressSubmit = (event) => {
        event?.preventDefault();
        onSubmit(newName, newNumber);
        setNewName('');
        setNewNumber('');
    };

    return (
        <form>
            <InputText label="name" placeholder="Enter Name" value={newName} onChange={onChangeValue} />
            <InputText type="tel" label="number" placeholder="Enter Phone number" value={newNumber} onChange={(event) => onChangeValue(event, 'number')} />
            <Button disabled={!newName || !newNumber || !!disabled} title={submitText} onClick={onPressSubmit} />
        </form>
    );
}

export default Form;
