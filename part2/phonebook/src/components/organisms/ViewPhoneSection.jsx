import { useMemo } from "react";
import { Button, Heading } from "../atoms/index";

const ViewPhoneSection = ({
  persons = [],
  filterText = "",
  fetchError = false,
  loading = false,
  onPressDeletePhone = () => {},
}) => {
  const filteredList = useMemo(() => {
    if (!filterText) {
      return persons;
    } else {
      return persons?.filter(({ name, number }) => {
        return (
          name?.toLowerCase()?.includes(filterText) ||
          number?.toLowerCase()?.includes(filterText)
        );
      });
    }
  }, [filterText, persons]);

  return (
    <div>
      <Heading title="Number" />
      {!!fetchError ? (
        <p>
          Something went wrong while fetchig phonebook. Please try again later!!{" "}
        </p>
      ) : (
        filteredList?.map(({ name, number, id }) => (
          <p key={`${id}`}>
            {name}: {number}{" "}
            <Button
              title="delete"
              disabled={!!loading}
              onClick={() => onPressDeletePhone(id)}
            />
          </p>
        ))
      )}
      {!!loading && <p>Loading...</p>}
    </div>
  );
};

export default ViewPhoneSection;
