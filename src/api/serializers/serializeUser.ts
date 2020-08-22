import { Appartment, Voucher } from "../models";
import serializeAppartment from "./serializeAppartment";
import serializeVoucher from "./serializeVoucher";

const serializeUser = async (userDocument, options = {}) => {
  const { onlyInfo } = options;

  const user = userDocument.toObject({ versionKey: false });

  user.id = user._id;
  delete user._id;

  if (onlyInfo) {
    user.appartments = user.appartments.map((id) => ({ id }));
    user.vouchers = user.vouchers.map((id) => ({ id }));

    return user;
  }

  if (user.appartments?.length) {
    const _appartments = await Appartment.find({
      _id: { $in: user.appartments },
    });

    const promises = _appartments.map((app) =>
      serializeAppartment(app, { onlyInfo: true })
    );

    user.appartments = await Promise.all(promises);
  }

  if (user.appartments?.length) {
    const _vouchers = await Voucher.find({ _id: { $in: user.vouchers } });
    user.vouchers = _vouchers.map((voucher) => serializeVoucher(voucher));
  }

  return user;
};

export default serializeUser;
