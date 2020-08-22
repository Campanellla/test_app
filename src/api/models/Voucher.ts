import mongoose from "mongoose";

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Appartment owner is not defined"],
  },
  name: {
    type: String,
    required: [true, "voucher name is not defined"],
  },
  variant: {
    type: String,
    required: [true, "voucher variant is not defined"],
  },
  price: {
    type: Number,
    required: [true, "voucher price is not defined"],
  },
  quantity: Number,
});

schema.index({ "$**": "text" });

export const Voucher =
  mongoose.models.Voucher || mongoose.model("Voucher", schema);
