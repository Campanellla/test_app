import { Appartment } from "../../models/Appartment";

export default async (_, args, { user }) => {
  const appartment = await Appartment.findById(args.id);

  const { _id: id, ...rest } = appartment.toObject({ versionKey: false });

  const response = { id, ...rest };

  return response;
};
