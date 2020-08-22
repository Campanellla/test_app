import { Booking } from "../../models/Appartment";

export default async (_, args) => {
  const booking = await Booking.create(args.input);

  const { _id: id, ...rest } = booking.toObject({ versionKey: false });

  const response = { id, ...rest };

  return response;
};
