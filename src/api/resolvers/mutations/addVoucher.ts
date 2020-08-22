import { Voucher, User } from "../../models";

const addVoucher = async (_, args, { user }) => {
  if (!user.id) throw new Error("user not loggged in");

  const voucher = await Voucher.create({ ...args.input, owner: user.id });

  const { _id: id, ...rest } = voucher.toObject({ versionKey: false });

  const uservouchers = user.vouchers.map((v) => v.id);
  uservouchers.push(id);

  await User.findByIdAndUpdate(
    user.id,
    { vouchers: uservouchers },
    { new: true }
  );

  const response = { id, ...rest, owner: user };

  return response;
};

export default addVoucher;
