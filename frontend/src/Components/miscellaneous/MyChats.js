import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSender } from "../Config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import GroupChatModal from "./GroupChatModal";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const history = useNavigate();
  // Assuming toast is handled elsewhere or replaced with Bootstrap alerts
  // const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("http://localhost:5000/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      // Using Bootstrap alert instead of toast
      const alertDiv = document.createElement("div");
      alertDiv.className = "alert alert-warning alert-dismissible fade show";
      alertDiv.role = "alert";
      alertDiv.innerHTML = `
        <strong>Error Occurred!</strong> Failed to Load the Chats
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 5000);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return React.createElement(
    "div",
    {
      className: `d-${
        selectedChat ? "none" : "flex"
      } flex-column align-items-center p-3 bg-white w-100 w-md-31 border rounded`,
      style: { width: selectedChat ? "100%" : "31%" },
    },
    React.createElement(
      "div",
      {
        className:
          "d-flex justify-content-between align-items-center w-100 p-3",
        style: { fontSize: "28px", fontFamily: "'Work Sans', sans-serif" },
      },
      "My Chats",
      React.createElement(
        GroupChatModal,
        null,
        React.createElement(
          "button",
          {
            className: "btn btn-primary d-flex align-items-center",
            style: { fontSize: "17px" },
          },
          "New Group Chat",
          React.createElement("i", { className: "bi bi-plus ms-2" }) // Using Bootstrap Icons for AddIcon
        )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "d-flex flex-column p-3 bg-light w-100 h-100 rounded overflow-hidden",
      },
      chats &&
        chats.map((chat) =>
          React.createElement(
            "div",
            {
              key: chat._id,
              onClick: () => setSelectedChat(chat),
              className: `p-3 mb-2 rounded ${
                selectedChat === chat
                  ? "bg-info text-white"
                  : "bg-secondary-subtle text-dark"
              }`,
              style: { cursor: "pointer" },
            },
            React.createElement(
              "p",
              { className: "m-0" },
              !chat.isGroupChat
                ? getSender(loggedUser, chat.users)
                : chat.chatName
            )
          )
        )
    )
  );
};

export default MyChats;
