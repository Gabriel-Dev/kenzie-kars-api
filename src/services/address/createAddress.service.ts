import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import { iAddressRequest } from "../../interfaces/address.interface";
import { addressResponseSchema } from "../../schemas/address.schema";

const createAddressService = async (userId: string, body: iAddressRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  return await userRepository
    .findOneByOrFail({ id: userId })
    .then(async (user) => {
      const created = addressRepository.create({ ...body, user: user });
      await addressRepository.save(created);

      return addressResponseSchema.parse(created);
    });
};

export { createAddressService };
