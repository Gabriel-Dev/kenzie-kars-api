import {
  addressRequestSchema,
  addressResponseSchema,
  addressUpdateSchema,
} from "../schemas/address.schema";

type iAddressRequest = typeof addressRequestSchema;
type iAddressResponse = typeof addressResponseSchema;
type iAddressUpdate = typeof addressUpdateSchema;

export { iAddressRequest, iAddressResponse, iAddressUpdate };
