import type { Order } from '../../domain/structs'
import type { PetType } from '../../enums/pet-type'

export interface IOrdersRepository {
  findAll(): Promise<Order[]>
  findAllByCustomerId(customerId: string): Promise<Order[]>
  findAllByPetType(petType: PetType): Promise<Order[]>
  findAllByPetBreed(petBreed: string): Promise<Order[]>
  add(order: Order): Promise<void>
  addMany(orders: Order[]): Promise<void>
  removeAll(): Promise<void>
}
