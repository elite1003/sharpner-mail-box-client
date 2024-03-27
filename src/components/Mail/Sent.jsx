import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sent = () => {
  const sentMail = useSelector((state) => state.mail.sent);
  return (
    <ListGroup>
      {sentMail.map((item) => (
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

export default Sent;
