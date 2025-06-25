import type { Service } from '../../domain/entities'
import type { PetType } from '../../enums/pet-type'

export interface IServicesRepository {
  findAll(): Promise<Service[]>
  findMany(page: number): Promise<Service[]>
  findManyByCustomerId(
    page: number,
    customerId: string,
  ): Promise<{ services: Service[]; count: number }>
  findManyByPetType(
    page: number,
    petType: PetType,
  ): Promise<{ services: Service[]; count: number }>
  findManyByPetBreed(
    page: number,
    petBreed: string,
  ): Promise<{ services: Service[]; count: number }>
  findManyMostConsumedServices(
    page: number,
  ): Promise<{ services: Service[]; count: number }>
  findManyMostConsumedServicesByCustomersGender(
    page: number,
    gender: 'male' | 'female',
  ): Promise<{ services: Service[]; count: number }>
  removeAll(): Promise<void>
  removeMany(servicesIds: string[]): Promise<void>
  count(): Promise<number>
  update(service: Service): Promise<void>
  add(customer: Service): Promise<void>
}
