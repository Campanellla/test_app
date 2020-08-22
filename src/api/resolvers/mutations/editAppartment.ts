import { Appartment, TimeSlot } from "../../models";

const addVoucher = async (_, args, { user }) => {
  const { id, timeSlots, ...input } = args.input;

  if (!user?.vouchers?.find((idtest) => idtest === id))
    throw new Error("You not the owner of appartment");

  if (timeSlots) {
    const oldslots = timeSlots.filter((slot) => slot.id);
    const newslots = timeSlots.filter((slot) => !slot.id);

    const slots = (await TimeSlot.create(newslots)).map((slot) =>
      slot.toObject({ versionKey: false })
    );

    const _timeSlots = [...oldslots, ...slots];

    input.timeSlots = _timeSlots;
  }

  const { _id, ...rest } = (
    await Appartment.findByIdAndUpdate(id, input, {
      new: true,
    })
  ).toObject({ versionKey: false });

  const response = { id, ...rest, owner: user };

  return response;
};

export default addVoucher;
