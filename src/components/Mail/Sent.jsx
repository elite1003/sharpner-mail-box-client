import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteMail } from "../../hooks/useSent";
const Sent = () => {
  const sentMail = useSelector((state) => state.mail.sent);
  const userEmail = useSelector((state) => state.auth.email);
  const handleDeleteEmail = useDeleteMail(userEmail);
  return (
    <ListGroup>
      {sentMail.map((item) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex justify-content-between"
        >
          <Link
            to={`${item.id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <strong>Subject: </strong>
            {item.subject}
          </Link>
          <Button onClick={() => handleDeleteEmail(item.id)}>Delete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Sent;
