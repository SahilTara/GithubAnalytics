import React, { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import Octicon, { Search } from "@primer/octicons-react";

interface IProps {
  searchHandler: (textToSearch: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<IProps> = ({ searchHandler, initialValue = "" }) => {
  const [validated, setValidated] = useState(false);
  const [textToSearch, setTextToSearch] = useState(initialValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      searchHandler(textToSearch);
    }

    setValidated(true);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTextToSearch(event.currentTarget.value);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            required
            placeholder="Find a repository..."
            aria-label="Find a repository"
            minLength={1}
            value={textToSearch}
            onChangeCapture={handleInputChange}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-primary">
              Search <Octicon icon={Search} />
            </Button>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            You must type something in search!
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
