const mongoose = require("mongoose");

const AllUserModel = mongoose.Schema(
  {
    name: {
      type: String, //dataType
      required: true, //validate
    },
    email: {
      type: String, //dataType
      required: true, //validate
    },
    password: {
      type: String, //dataType
      required: true, //validate
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const AllUser = mongoose.model("AllUser", AllUserModel);
module.exports = AllUser;
