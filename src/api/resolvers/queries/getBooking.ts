import { Booking } from "../../models";

export default async (_, args) => {
  const booking = await Booking.findById(args.id);

  const { _id: id, ...rest } = booking.toObject({ versionKey: false });
  const response = { id, ...rest };

  return response;
};
