import mongoose from "mongoose";

const schema = new mongoose.Schema({
  start: {
    type: String,
    required: [true, "start is not defined"],
  },
  end: {
    type: String,
    required: [true, "end is not defined"],
  },
  user: mongoose.Schema.Types.ObjectId,
});

schema.index({ "$**": "text" });

export const TimeSlot =
  mongoose.models.TimeSlot || mongoose.model("TimeSlot", schema);
