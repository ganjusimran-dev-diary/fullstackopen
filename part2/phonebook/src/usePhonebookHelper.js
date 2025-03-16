import { useState, useEffect } from "react";
import { addPhoneNumber, deletePhoneNumber, getPhonebookData, updatePhoneNumber } from "./helpers";

const usePhonebookHelper = () => {
    const [persons, setPersons] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        setLoading(true);
        getPhonebookData().then((response) => {
            if (response?.error) {
                setFetchError(response?.error);
            } else {
                setFetchError('');
                setPersons(response?.data);
            }
        }).catch((err) => {
            setFetchError(JSON.stringify(err));
        }).finally(() => setLoading(false))
    }, []);

    const onChangeFilterValue = (event) => {
        setFilterText(event.target.value);
    };

    const onPressAddPerson = (person) => {
        const isAlreadyPresentId = persons?.findIndex((item) => item?.name?.toLowerCase() === person?.name?.toLowerCase());
        if (isAlreadyPresentId < 0) {
            setLoading(true);
            addPhoneNumber({ ...person, id: `${persons?.length + 1}` }).then((response) => {
                if (response?.error) {
                    setFetchError(response?.error);
                } else {
                    setFetchError('');
                    setPersons(prev => {
                        return [
                            ...prev,
                            response?.data
                        ]
                    });
                }
            }).catch((err) => {
                setFetchError(JSON.stringify(err));
            }).finally(() => {
                setLoading(false);
            })
        } else {
            const onPressReplace = confirm(`${persons[isAlreadyPresentId]?.name} is already added to phonebook, replace the old numbet with a new one ?`);
            if (onPressReplace) {
                updatePhoneNumber({ ...person, id: isAlreadyPresentId + 1 }).then((response) => {
                    if (response?.error) {
                        setFetchError(response?.error);
                    } else {
                        setFetchError('');
                        setPersons(prev => {
                            const newPersonArr = [...prev];
                            newPersonArr[response.data?.id - 1] = response.data;
                            return newPersonArr;
                        });
                    }
                }).catch((err) => {
                    setFetchError(JSON.stringify(err));
                }).finally(() => {
                    setLoading(false);
                })
            }
        }

    }

    const onPressDeletePhone = (id) => {
        const onPressOk = confirm(`Delete ${persons[id - 1]?.name} ?`);
        if (onPressOk) {
            setLoading(true);
            deletePhoneNumber(id).then((response) => {
                if (!response?.error) {
                    const resultList = persons.filter((person) => person?.id != id);
                    setPersons(resultList);
                }
            }).catch((err) => { }).finally(() => {
                setLoading(false);
            });
        }
    }

    return {
        persons,
        loading,
        fetchError,
        filterText,
        onPressAddPerson,
        onPressDeletePhone,
        onChangeFilterValue,
    }
}

export default usePhonebookHelper;