import { Form } from './index'
import { Heading } from '../atoms/index';

const AddPhoneSection = ({ setPersons }) => {

    const onPressAdd = (name, number) => {
        setPersons((prev) => [
            ...prev,
            { name, number, id: prev.length + 1 }
        ])
    }


    return (
        <div>
            <Heading title='add a new' />
            <Form submitText='add' onSubmit={onPressAdd} />
        </div>
    )
}

export default AddPhoneSection