import mongoose from "mongoose";

const schema = new mongoose.Schema({
  appartment: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "appartment is not defined"],
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "time slot is not defined"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "buyer is not defined"],
  },
});

schema.index({ "$**": "text" });

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", schema);
