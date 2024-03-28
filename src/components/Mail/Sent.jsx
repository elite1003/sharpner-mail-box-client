import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";
import { useDispatch } from "react-redux";
const Sent = () => {
  const sentMail = useSelector((state) => state.mail.sent);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const handleDeleteEmail = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("deleting message from sent failed");
      }
      dispatch(mailActions.removeMailFromSent(id));
    } catch (error) {
      alert(error.message);
    }
  };
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
