import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Form, Card, Col, Row, Container } from "react-bootstrap";
import classes from "./ComposeMail.module.css";
import { useComposeAndSendMail } from "../../hooks/useComposeMail";
function ComposeMail() {
  const {
    to,
    onToChange,
    subject,
    onSubjectChange,
    editorState,
    onEditorStateChange,
    sendMail,
  } = useComposeAndSendMail();
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
                  <Form.Control type="email" value={to} onChange={onToChange} />
                </Form.Group>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={onSubjectChange}
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
