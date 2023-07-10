import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"

const deleteUserService = async ( userId: string ): Promise<object> => {
  await AppDataSource.getRepository( User ).delete({ id: userId })

  return {}
}

export { deleteUserService }
