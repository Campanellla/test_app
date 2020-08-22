import { User } from "../../models";

const currentUser = async (_, __, { user }) => {
  return user || {};
};

export default currentUser;
