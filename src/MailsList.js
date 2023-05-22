import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import MailDataService from "./mailservices";

const MailsList = ({ getMailId }) => {
  const [mails, setMails] = useState([]);
  useEffect(() => {
    getMails();
  }, []);

  const getMails = async () => {
    const data = await MailDataService.getAllMails();
    console.log(data.docs);
    setMails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await MailDataService.deleteMail(id);
    getMails();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getMails}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.mail}</td>
                <td>{doc.password}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getMailId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default MailsList;