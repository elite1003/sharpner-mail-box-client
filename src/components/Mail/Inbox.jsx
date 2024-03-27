import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Inbox = () => {
  const inboxMail = useSelector((state) => state.mail.inbox);
  return (
    <ListGroup>
      {inboxMail.map((item) => (
        <ListGroup.Item key={item.id}>
          <Link
            to={`${item.id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <strong>Subject: </strong>
            {item.subject}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Inbox;
