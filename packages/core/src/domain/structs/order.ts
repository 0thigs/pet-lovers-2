import type { OrderDto } from '../../dtos/order-dto'

type OrderProps = {
  customerId: string
  itemId: string
  petId: string
  amount: number
}

export class Order {
  readonly customerId: string
  readonly itemId: string
  readonly petId: string
  readonly amount: number

  private constructor(dto: OrderProps) {
    this.customerId = dto.customerId
    this.itemId = dto.itemId
    this.petId = dto.petId
    this.amount = dto.amount
  }

  static create(dto: OrderDto) {
    return new Order({
      amount: dto.amount,
      customerId: dto.customerId,
      itemId: dto.itemId,
      petId: dto.petId,
    })
  }

  get dto() {
    return {
      customerId: this.customerId,
      itemId: this.itemId,
      petId: this.petId,
      amount: this.amount,
    }
  }
}
