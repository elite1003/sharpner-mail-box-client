import React from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";

const Inbox = () => {
  const inboxMail = useSelector((state) => state.mail.inbox);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const handleMailClick = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isRead: true }),
          headers: { "Content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("updating message status from non read to read failed");
      }
      dispatch(mailActions.updateInboxMail(id));
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDeleteEmail = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("deleting message from inbox failed");
      }
      dispatch(mailActions.removeMailFromInbox(id));
    } catch (error) {
      alert(error.message);
    }
  };
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
