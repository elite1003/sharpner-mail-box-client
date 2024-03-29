import React from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMailClick, useDeleteMail } from "../../hooks/useInbox";
const Inbox = () => {
  const inboxMail = useSelector((state) => state.mail.inbox);
  const userEmail = useSelector((state) => state.auth.email);
  const handleMailClick = useMailClick(userEmail);
  const handleDeleteEmail = useDeleteMail(userEmail);
  return (
    <ListGroup>
      {inboxMail.map((item) => (
        <ListGroup.Item
          key={item.id}
          className="d-flex justify-content-between"
        >
          <div>
            {" "}
            {!item.isRead && (
              <Badge pill variant="primary" style={{ marginRight: "5px" }}>
                {" "}
              </Badge>
            )}
            <Link
              onClick={() => handleMailClick(item.id)}
              to={`${item.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <strong>Subject: </strong>
              {item.subject}
            </Link>
          </div>
          <Button onClick={() => handleDeleteEmail(item.id)}>Delete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Inbox;
