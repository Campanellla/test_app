import { Voucher } from "../../models";
import { serializeVoucher } from "../../serializers";

const listVouchers = async () => {
  const _vouchers = await Voucher.find({});

  const promises = _vouchers.map((voucher) => serializeVoucher(voucher));

  const vouchers = await Promise.all(promises);

  return vouchers;
};

export default listVouchers;
