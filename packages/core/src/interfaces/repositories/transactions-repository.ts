import type { Service } from '../../domain/entities'

export interface IServicesRepository {
  findAll(): Promise<Service[]>
  findMany(page: number): Promise<Service[]>
  findManyMostConsumedServices(
    page: number,
  ): Promise<{ services: Service[]; count: number }>
  findManyMostConsumedServicesByMaleCustomers(
    page: number,
  ): Promise<{ services: Service[]; count: number }>
  findManyMostConsumedServicesByFemaleCustomers(
    page: number,
  ): Promise<{ services: Service[]; count: number }>
  removeAll(): Promise<void>
  removeMany(servicesIds: string[]): Promise<void>
  count(): Promise<number>
  update(service: Service): Promise<void>
  add(customer: Service): Promise<void>
}
