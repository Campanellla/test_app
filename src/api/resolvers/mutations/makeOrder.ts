import { Order } from "../../models/Appartment";

export default async (_, args) => {
  const order = await Order.create(args.input);

  const { _id: id, ...rest } = order.toObject({ versionKey: false });

  const response = { id, ...rest };

  return response;
};
