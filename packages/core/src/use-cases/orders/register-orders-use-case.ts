import { Order } from '../../domain/structs'
import type { OrderDto } from '../../dtos'
import type { IOrdersRepository } from '../../interfaces'

export class RegisterOrdersUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(ordersDto: OrderDto[]) {
    const orders = ordersDto.map(Order.create)
    await this.ordersRepository.addMany(orders)
  }
}
