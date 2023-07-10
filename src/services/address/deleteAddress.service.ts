import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { AppError } from "../../errors/AppError";

const deleteAddressService = async (id: string): Promise<object> => {
  const addressRepository = AppDataSource.getRepository(Address);

  return await addressRepository
    .findOneByOrFail({ id: id })
    .then(async (res) => {
      await addressRepository.delete({ id: id });

      return {};
    })
    .catch((err) => {
      throw new AppError("Address not found", 404);
    });
};

export { deleteAddressService };
