import type { Product } from '../../domain/entities'
import type { PetType } from '../../enums/pet-type'

export interface IProductsRepository {
  findAll(): Promise<Product[]>
  findMany(page: number): Promise<Product[]>
  findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ products: Product[]; count: number }>
  findManyByPetType(
    page: number,
    petType: PetType,
  ): Promise<{ products: Product[]; count: number }>
  findManyByPetBreed(
    page: number,
    petBreed: string,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProducts(
    page: number,
  ): Promise<{ products: Product[]; count: number }>
  findManyMostConsumedProductsByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ products: Product[]; count: number }>
  removeAll(): Promise<void>
  removeMany(productsIds: string[]): Promise<void>
  count(): Promise<number>
  update(product: Product): Promise<void>
  add(customer: Product): Promise<void>
}
