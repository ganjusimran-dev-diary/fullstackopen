import { useMemo } from 'react';
import { Heading } from '../atoms/index';

const ViewPhoneSection = ({ persons = [], filterText = '' }) => {

    const filteredList = useMemo(() => {
        if (!filterText) {
            return persons;
        } else {
            return persons?.filter(({ name, number }) => {

                return name?.toLowerCase()?.includes(filterText) || number?.toLowerCase()?.includes(filterText)
            })
        }
    }, [filterText, persons])

    return (
        <div>
            <Heading title='Number' />
            {
                filteredList?.map(({ name, number, id }) => <p key={`${id}`}>{name}: {number}</p>)
            }
        </div>
    )
}

export default ViewPhoneSection