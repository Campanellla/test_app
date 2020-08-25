import { User } from "../models";
import { serializeUser } from "../serializers";

const context = async ({ req }) => {
  let user = null;
  try {
    const { authorization } = req.headers;

    //// JWT CHECK HERE

    const userBySub = await User.findOne({ userSub: authorization });

    user = await serializeUser(userBySub, { onlyInfo: false });
  } catch (error) {}

  return { user };
};

export default context;
