import { User } from "../../models/Appartment";

export default async (_, args) => {
  const user = await User.create(args.input);

  const { _id: id, ...rest } = user.toObject({ versionKey: false });

  const response = { id, ...rest };

  return response;
};
