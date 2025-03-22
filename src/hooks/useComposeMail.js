import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mail-slice";
import { useState } from "react";

export const useComposeAndSendMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onToChange = (e) => {
    setTo(e.target.value);
  };

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const sendMail = async (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const blocks = convertToRaw(contentState).blocks.map((block) => block.text);
    try {
      const sentMailData = {
        to,
        subject,
        blocks,
      };
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(sentMailData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("saving data to firebase sent DB failed");
      }
      const data = await response.json();
      dispatch(mailActions.addMailToSent({ ...sentMailData, id: data.name }));
    } catch (error) {
      alert(error.message);
    }
    try {
      const inboxMailData = {
        from: userEmail,
        subject,
        blocks,
        isRead: false,
      };
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${to.replace(
          /[@.]/g,
          ""
        )}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(inboxMailData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("saving data to firebase inbox DB failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    to,
    onToChange,
    subject,
    onSubjectChange,
    editorState,
    onEditorStateChange,
    sendMail,
  };
};
