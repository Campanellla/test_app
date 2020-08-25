import { User, TimeSlot } from "../models";
import serializeTimeSlot from "./serializeTimeSlot";
import serializeUser from "./serializeUser";

const serializeAppartment = async (appartmentDocument, options = {}) => {
  const { onlyInfo } = options;

  const appartment = appartmentDocument.toObject({ versionKey: false });

  appartment.id = appartment._id;
  delete appartment._id;

  if (onlyInfo) {
    appartment.timeSlots = appartment.timeSlots.map((id) => ({ id }));
    appartment.owner = { id: appartment.owner };
    return appartment;
  }

  const _owner = await User.findById(appartment.owner);

  appartment.owner = await serializeUser(_owner, { onlyInfo: true });

  const _timeSlots = await TimeSlot.find({
    _id: { $in: appartment.timeSlots },
  });

  const timeSlots = _timeSlots.map((slot) =>
    serializeTimeSlot(slot, { onlyInfo: true })
  );

  appartment.timeSlots = timeSlots;

  return appartment;
};

export default serializeAppartment;
