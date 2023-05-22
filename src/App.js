import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddMail from "./AddMail";
import MailsList from "./MailsList";
import "./App.css";

function App() {
  const [mailId, setMailId] = useState("");

  const getMailIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setMailId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Email - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddMail id={mailId} setMailId={setMailId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <MailsList getMailId={getMailIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
