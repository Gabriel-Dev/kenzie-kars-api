import { Request, Response } from "express";
import {
  iAddressRequest,
  iAddressUpdate,
} from "../interfaces/address.interface";
import { createAddressService } from "../services/address/createAddress.service";
import { updateAddressService } from "../services/address/updateAddress.service";
import { retrieveAddressService } from "../services/address/retrieveAddress.service";
import { deleteAddressService } from "../services/address/deleteAddress.service";

const createAddressController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const data: iAddressRequest = req.body;

  const address = await createAddressService(userId, data);

  return res.status(201).json(address);
};

const updateAddressController = async (req: Request, res: Response) => {
  const addressId: string = req.params.addressId;
  const data: iAddressUpdate = req.body;

  const updatedAddress = await updateAddressService(addressId, data);

  return res.status(200).json(updatedAddress);
};

const retrieveAddressController = async (req: Request, res: Response) => {
  const id: string = req.params.addressId;

  const address = await retrieveAddressService(id);

  return res.status(200).json(address);
};

const deleteAddressController = async (req: Request, res: Response) => {
  const id: string = req.params.addressId;

  const deletedAddress = await deleteAddressService(id);

  res.status(204).json(deletedAddress);
};

export {
  createAddressController,
  updateAddressController,
  retrieveAddressController,
  deleteAddressController,
};
