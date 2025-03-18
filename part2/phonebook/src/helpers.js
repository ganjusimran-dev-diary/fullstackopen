import axios from "axios";
const BASE_PHONE_BOOK_URL = `${
  import.meta.env?.VITE_BASE_URL || ""
}/api/persons`;

export const getPhonebookData = async () => {
  return await axios
    .get(BASE_PHONE_BOOK_URL)
    .then((res) => res)
    .catch((err) => ({ error: err?.message }));
};

export const addPhoneNumber = async (phoneItem) => {
  return await axios
    .post(BASE_PHONE_BOOK_URL, phoneItem)
    .then((res) => res)
    .catch((err) => ({ error: err?.message }));
};

export const deletePhoneNumber = async (id, person) => {
  return await axios
    .delete(`${BASE_PHONE_BOOK_URL}/${id}`)
    .then((res) => res)
    .catch((err) => {
      return {
        error:
          err?.status == 404
            ? `Information ${person?.name} has already been removed from server`
            : `Failed to delete ${person?.name}`,
      };
    });
};

export const updatePhoneNumber = async (phoneItem, index) => {
  return await axios
    .put(`${BASE_PHONE_BOOK_URL}/${phoneItem?.id}`, phoneItem)
    .then((res) => res)
    .catch((err) => {
      return {
        error:
          err?.status == 404
            ? `Information ${phoneItem?.name} has already been removed from server`
            : `Failed to delete ${persons[deletedIndex]?.name}`,
      };
    });
};
