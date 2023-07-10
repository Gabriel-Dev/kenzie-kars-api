import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";
import { addressResponseSchema } from "../../schemas/address.schema";

const retrieveAddressService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Address);

  return await addressRepository
    .findOneByOrFail({ id: id })
    .then((res) => {
      return addressResponseSchema.omit({ user: true }).parse(res);
    })
    .catch((err) => {
      throw new AppError("Address not found", 404);
    });
};

export { retrieveAddressService };
