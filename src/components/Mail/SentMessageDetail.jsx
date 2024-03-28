import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
const SentMessageDetail = () => {
  const { id } = useParams();
  const sentMail = useSelector((state) => state.mail.sent);
  const message = sentMail.find((mail) => mail.id === id);
  return (
    <Card>
      <Card.Header>
        <Card.Title>Subject: {message.subject}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          To: {message.to}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {message.blocks.map((text, index) => (
          <Card.Text key={index}>{text}</Card.Text>
        ))}
      </Card.Body>
    </Card>
  );
};

export default SentMessageDetail;
