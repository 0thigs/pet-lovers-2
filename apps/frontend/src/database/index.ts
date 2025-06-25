import {
  LocalStorageCustomersRepository,
  LocalStorageProductsRepository,
  LocalStorageServicesRepository,
  LocalStorageOrdersRepository,
} from './localstorage/repositories'
import { LocalStoragePetsRepository } from './localstorage/repositories/local-storage-pets-repository'
import { Seed } from './localstorage/seed'

export const ordersRepository = LocalStorageOrdersRepository()
export const customersRepository = LocalStorageCustomersRepository(ordersRepository)
export const productsRepository = LocalStorageProductsRepository(
  ordersRepository,
  customersRepository,
)
export const servicesRepository = LocalStorageServicesRepository(
  ordersRepository,
  customersRepository,
)
export const petsRepository = LocalStoragePetsRepository(customersRepository)

Seed()
