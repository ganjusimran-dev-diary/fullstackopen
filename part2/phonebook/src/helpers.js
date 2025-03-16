import axios from 'axios';
const BASE_PHONE_BOOK_URL = 'http://localhost:3001/persons';

export const getPhonebookData = async () => {
    return await axios.get(BASE_PHONE_BOOK_URL).then((res) => res).catch((err) => ({ error: err?.message }))
}

export const addPhoneNumber = async (phoneItem) => {
    return await axios.post(BASE_PHONE_BOOK_URL, phoneItem).then((res) => res).catch((err) => ({ error: err?.message }))
}

export const deletePhoneNumber = async (id) => {
    return await axios.delete(`${BASE_PHONE_BOOK_URL}/${id}`).then((res) => res).catch((err) => ({ error: err?.message }))
}

export const updatePhoneNumber = async (phoneItem) => {
    return await axios.put(`${BASE_PHONE_BOOK_URL}/${phoneItem?.id}`, phoneItem).then((res) => res).catch((err) => ({ error: err?.message }))
}