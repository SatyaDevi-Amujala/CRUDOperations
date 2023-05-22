import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import MailDataService from "./mailservices";

const AddMail = ({ id, setMailId }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Male");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (mail === "" || password === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newMail = {
      mail,
      password,
      status,
    };
    console.log(newMail);

    try {
      if (id !== undefined && id !== "") {
        await MailDataService.updateMail(id, newMail);
        setMailId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await MailDataService.addMails(newMail);
        setMessage({ error: false, msg: "New Mail added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setMail("");
    setPassword("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await MailDataService.getMail(id);
      console.log("the record is :", docSnap.data());
      setMail(docSnap.data().mail);
      setPassword(docSnap.data().password);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formMail">
            <InputGroup>
              <InputGroup.Text id="formMail">E</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMail">
            <InputGroup>
              <InputGroup.Text id="formMail">P</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="secondary"
              onClick={(e) => {
                setStatus("Male");
                setFlag(true);
              }}
            >
              Male
            </Button>
            <Button
              variant="secondary"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Female");
                setFlag(false);
              }}
            >
              Female
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddMail;