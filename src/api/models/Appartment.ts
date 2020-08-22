import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Appartment owner is not defined"],
  },
  name: {
    type: String,
    required: [true, "Appartment name is not defined"],
  },
  description: String,
  image: {
    type: String,
    required: [true, "Appartment image is not defined"],
  },
  price: {
    type: Number,
    required: [true, "Appartment price is not defined"],
  },
  rooms: {
    type: Number,
    required: [true, "Appartment rooms is not defined"],
  },
  timeSlots: [mongoose.Schema.Types.ObjectId],
});

schema.index({ "$**": "text" });

export const Appartment =
  mongoose.models.Appartment || mongoose.model("Appartment", schema);
