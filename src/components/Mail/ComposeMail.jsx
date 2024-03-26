import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Form, Card, Col, Row, Container } from "react-bootstrap";
import classes from "./ComposeMail.module.css";
import { useSelector } from "react-redux";

function ComposeMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userEmail = useSelector((state) => state.auth.email);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            to,
            subject,
            blocks: convertToRaw(contentState).blocks,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("saving data to sent email failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${to.replace(
          /[@.]/g,
          ""
        )}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: userEmail,
            subject,
            blocks: convertToRaw(contentState).blocks,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("saving data to inbox email failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <Card.Body className="w-75 ">
        <Container className="p-5 border  shadow rounded">
          <Row>
            <Col>
              <h1 className="text-center mb-4">Compose And Send Mail</h1>
              <Form>
                <Form.Group controlId="formTo">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBody">
                  <Form.Label>Body</Form.Label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName={classes["demo-wrapper"]}
                    editorClassName={classes["demo-editor"]}
                  />
                </Form.Group>
                <Button variant="primary" onClick={sendMail}>
                  Send
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default ComposeMail;
