import { useState } from "react";
import { Input } from "../atoms/index";

const Search = ({
    label = '',
    placeholder = '',
    disabled = false,
    onSearch = (ele) => { }
}) => {
    const [value, setValue] = useState('');

    const onValueChange = (event) => {
        setValue(event?.target?.value);
        if (event?.target?.value?.trim() !== value?.trim()) {
            onSearch(event?.target?.value?.trim());
        }
    }

    return (
        <Input
            disabled={disabled}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
        />
    )
}

export default Search;
