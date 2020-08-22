import { Voucher } from "../../models";

const addVoucher = async (_, args, { user }) => {
  const { id, ...input } = args.input;

  if (!user?.vouchers?.find((idtest) => idtest === id))
    throw new Error("You not the owner of voucher");

  const { _id, ...rest } = (
    await Voucher.findByIdAndUpdate(id, input, {
      new: true,
    })
  ).toObject({ versionKey: false });

  const response = { id, ...rest, owner: user };

  return response;
};

export default addVoucher;
