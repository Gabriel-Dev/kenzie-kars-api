import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";
import { iAddressUpdate } from "../../interfaces/address.interface";
import { addressResponseSchema } from "../../schemas/address.schema";

const updateAddressService = async (id: string, body: iAddressUpdate) => {
  const addressRepository = AppDataSource.getRepository(Address);

  return await addressRepository
    .findOneByOrFail({ id: id })
    .then(async (res) => {
      const data = { ...res, ...body };

      await addressRepository.update({ id: id }, data);

      return addressResponseSchema.omit({ user: true }).parse(data);
    })
    .catch((err) => {
      throw new AppError("Address not found", 404);
    });
};

export { updateAddressService };
