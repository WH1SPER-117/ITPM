import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideDrawer() {
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingChat, setLoadingChat] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const onDrawerOpen = () => setIsDrawerOpen(true);
  const onDrawerClose = () => setIsDrawerOpen(false);

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please enter a name or email", {
        position: "top-left",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/allUsers?search=${search}`,
        config
      );

      // ✅ Assuming data is an array of users
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Failed to load the search results", {
        position: "top-left",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onDrawerClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement(
      "button",
      {
        type: "button",
        className: "btn btn-outline-light search-btn",
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "bottom",
        title: "Search Users",
        onClick: onDrawerOpen,
      },
      React.createElement("i", {
        className: "fas fa-search",
        style: { color: "black" },
      }),
      React.createElement(
        "span",
        { className: "d-none d-md-inline px-2" },
        React.createElement("strong", null, "Search Users")
      )
    ),
    React.createElement("span", { className: "navbar-brand" }, "QuickFixer"),
    React.createElement(
      "div",
      { className: "d-flex align-items-center" },
      React.createElement(
        "button",
        { className: "btn btn-link position-relative me-2" },
        React.createElement("i", {
          className: "fas fa-bell",
          style: { fontSize: "24px" },
        })
      ),
      React.createElement(
        "div",
        { className: "dropdown" },
        React.createElement(
          "button",
          {
            className: "btn dropdown-toggle d-flex align-items-center",
            type: "button",
            id: "profileDropdown",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          },
          React.createElement("img", {
            src: user.pic,
            alt: user.name,
            className: "avatar me-2",
          })
        ),
        React.createElement(
          "ul",
          { className: "dropdown-menu", "aria-labelledby": "profileDropdown" },
          React.createElement(
            "li",
            null,
            React.createElement(
              ProfileModel,
              { user },
              React.createElement(
                "span",
                { className: "dropdown-item" },
                "My Profile"
              )
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement("hr", { className: "dropdown-divider" })
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "span",
              { className: "dropdown-item", onClick: logoutHandler },
              "Logout"
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      {
        className: `offcanvas offcanvas-start ${isDrawerOpen ? "show" : ""}`,
        style: { visibility: isDrawerOpen ? "visible" : "hidden" },
        tabIndex: "-1",
        id: "searchOffcanvas",
      },
      React.createElement(
        "div",
        { className: "offcanvas-header border-bottom" },
        React.createElement(
          "h5",
          { className: "offcanvas-title" },
          "Search Users"
        ),
        React.createElement("button", {
          type: "button",
          className: "btn-close",
          onClick: onDrawerClose,
        })
      ),
      React.createElement(
        "div",
        { className: "offcanvas-body" },
        React.createElement(
          "div",
          { className: "d-flex pb-2" },
          React.createElement("input", {
            type: "text",
            className: "form-control me-2",
            placeholder: "Search by name or email",
            value: search,
            onChange: (e) => setSearch(e.target.value),
          }),
          React.createElement(
            "button",
            { className: "btn btn-primary", onClick: handleSearch },
            "Go"
          )
        ),
        loading
          ? React.createElement(ChatLoading, null)
          : searchResult.map((user) =>
              React.createElement(UserListItem, {
                key: user._id,
                user,
                handleFunction: () => accessChat(user._id),
              })
            ),
        loadingChat &&
          React.createElement(
            "div",
            { className: "spinner-border text-primary ms-auto d-flex" },
            React.createElement(
              "span",
              { className: "visually-hidden" },
              "Loading..."
            )
          )
      )
    )
  );
}

export default SideDrawer;
