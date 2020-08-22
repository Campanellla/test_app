import { Voucher } from "../../models";

export default async (_, args) => {
  const voucher = await Voucher.findById(args.id);

  const { _id: id, ...rest } = voucher.toObject({ versionKey: false });
  const response = { id, ...rest };

  return response;
};
