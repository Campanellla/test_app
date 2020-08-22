import { User } from "../../models/User";

export default async (_, args) => {
  const email = args.input.email;

  const user = await User.findOne({ email });

  if (user) {
    const { _id: id, email, userSub } = user.toObject({ versionKey: false });

    if (userSub === args.input.password) return { name: email, token: userSub };
  }

  throw new Error("email or password is not correct");
};
