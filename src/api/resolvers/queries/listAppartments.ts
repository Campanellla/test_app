import { Appartment } from "../../models";
import { serializeAppartment } from "../../serializers";

const listAppartments = async () => {
  const _appartments = await Appartment.find({});

  const promises = _appartments.map((app) => serializeAppartment(app));

  const appartments = await Promise.all(promises);

  return appartments;
};

export default listAppartments;
