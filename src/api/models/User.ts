import mongoose from "mongoose";

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "user type is not defined"],
  },

  email: {
    type: String,
    required: [true, "user email is not defined"],
  },

  firstName: {
    type: String,
    required: [true, "user name is not defined"],
  },
  lastName: {
    type: String,
    required: [true, "user name is not defined"],
  },

  bookings: [mongoose.Schema.Types.ObjectId],
  orders: [mongoose.Schema.Types.ObjectId],

  appartments: [mongoose.Schema.Types.ObjectId],
  vouchers: [mongoose.Schema.Types.ObjectId],

  userSub: {
    type: String,
    required: [true, "user sub is not defined"],
  },
});

schema.index({ "$**": "text" });

export const User = mongoose.models.User || mongoose.model("User", schema);
