import mongoose from "mongoose";

const schema = new mongoose.Schema({
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "voucher is not defined"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "buyer is not defined"],
  },
});

schema.index({ "$**": "text" });

export const Order = mongoose.models.Order || mongoose.model("Order", schema);
