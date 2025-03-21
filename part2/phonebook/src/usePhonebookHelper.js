import { useState, useEffect } from "react";
import {
  addPhoneNumber,
  deletePhoneNumber,
  getPhonebookData,
  updatePhoneNumber,
} from "./helpers";

const usePhonebookHelper = () => {
  const [persons, setPersons] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchPhonebookData();
  }, []);

  const fetchPhonebookData = () => {
    setLoading(true);
    getPhonebookData()
      .then((response) => {
        if (response?.error) {
          setFetchError(response?.error);
        } else {
          setFetchError("");
          setPersons(response?.data);
        }
      })
      .catch((err) => {
        setFetchError(JSON.stringify(err));
      })
      .finally(() => setLoading(false));
  };

  const onChangeFilterValue = (event) => {
    setFilterText(event.target.value);
  };

  const onClearNotification = () => {
    setNotification({ type: "", message: "" });
  };

  const onPressAddPerson = (person) => {
    const isAlreadyPresentId = persons?.findIndex(
      (item) => item?.name?.toLowerCase() === person?.name?.toLowerCase()
    );
    if (isAlreadyPresentId < 0) {
      setLoading(true);
      addPhoneNumber({
        ...person,
        id: `${+persons[persons?.length - 1]?.id + 1}`,
      })
        .then((response) => {
          if (response?.error) {
            setNotification({
              type: "error",
              message: response?.error,
            });
          } else {
            setNotification({
              type: "success",
              message: `Added ${person?.name}`,
            });
            setPersons((prev) => {
              return [...prev, response?.data];
            });
          }
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message: `Failed to add ${person?.name}`,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const onPressReplace = confirm(
        `${persons[isAlreadyPresentId]?.name} is already added to phonebook, replace the old number with a new one ?`
      );
      if (onPressReplace) {
        const updatedPerson = {
          ...person,
          id: persons[isAlreadyPresentId]?.id,
        };
        updatePhoneNumber(updatedPerson)
          .then((response) => {
            if (response?.error) {
              fetchPhonebookData();
              setNotification({ type: "error", message: response?.error });
            } else {
              setNotification({
                type: "success",
                message: `Updated ${person?.name}`,
              });
              setPersons((prev) => {
                const newPersonArr = [...prev];
                newPersonArr[isAlreadyPresentId] = updatedPerson;
                return newPersonArr;
              });
            }
          })
          .catch((err) => {
            setNotification({
              type: "error",
              message: `Failed to update ${person?.name}`,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const onPressDeletePhone = (id) => {
    const deletedIndex = persons?.findIndex((item) => item?.id == id);
    const onPressOk = confirm(`Delete ${persons[deletedIndex]?.name} ?`);
    if (onPressOk) {
      setLoading(true);
      deletePhoneNumber(id, persons[deletedIndex])
        .then((response) => {
          if (response?.error) {
            fetchPhonebookData();
            setNotification({ type: "error", message: response?.error });
          } else {
            setNotification({
              type: "success",
              message: `Deleted ${persons[deletedIndex]?.name}`,
            });
            const resultList = persons.filter((person) => person?.id != id);
            setPersons(resultList);
          }
        })
        .catch((err) => {
          setNotification({
            type: "error",
            message: `Failed to delete ${persons[deletedIndex]?.name}`,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return {
    persons,
    loading,
    fetchError,
    filterText,
    notification,
    onPressAddPerson,
    onPressDeletePhone,
    onChangeFilterValue,
    onClearNotification,
  };
};

export default usePhonebookHelper;
