import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  retrieveAddressController,
  updateAddressController,
} from "../controllers/address.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  addressRequestSchema,
  addressUpdateSchema,
} from "../schemas/address.schema";

const addressRoutes = Router();

addressRoutes.post(
  "/user/:id",
  ensureDataIsValidMiddleware(addressRequestSchema),
  createAddressController
);

addressRoutes.patch(
  "/:addressId",
  ensureDataIsValidMiddleware(addressUpdateSchema),
  updateAddressController
);

addressRoutes.get("/:addressId", retrieveAddressController);

addressRoutes.delete("/:addressId", deleteAddressController);

export { addressRoutes };
