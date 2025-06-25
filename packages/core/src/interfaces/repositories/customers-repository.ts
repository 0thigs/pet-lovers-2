import type { Customer } from '../../domain/entities/customer'

export interface ICustomersRepository {
  findById(id: string): Promise<Customer | undefined>
  findByPetId(petId: string): Promise<Customer | undefined>
  findAll(): Promise<Customer[]>
  findAllMale(): Promise<Customer[]>
  findAllFemale(): Promise<Customer[]>
  findManyMale(page: number): Promise<{ customers: Customer[]; count: number }>
  findManyFemale(page: number): Promise<{ customers: Customer[]; count: number }>
  findMany(page: number): Promise<{ customers: Customer[]; count: number }>
  findTop10CustomersByMostConsumption(): Promise<Customer[]>
  findTop10CustomersByLessConsumption(): Promise<Customer[]>
  findTop5CustomersByMostSpending(): Promise<Customer[]>
  removeAll(): Promise<void>
  removeMany(customerIds: string[]): Promise<void>
  add(customer: Customer): Promise<void>
  update(customer: Customer): Promise<void>
}
