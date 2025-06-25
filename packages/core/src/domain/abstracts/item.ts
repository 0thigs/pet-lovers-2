import type { ItemDto } from '../../dtos/item-dto'
import type { ItemCategory } from '../../types'
import { Entity } from './entity'

export type ItemProps = {
  name: string
  price: number
  description: string
  category: ItemCategory
  ordersCount: number
}

export abstract class Item extends Entity<ItemProps> {
  constructor(dto: ItemDto, id?: string) {
    super(
      {
        name: dto.name,
        category: dto.category,
        description: dto.description,
        price: dto.price,
        ordersCount: dto.ordersCount ?? 0,
      },
      id,
    )
  }

  set ordersCount(ordersCount: number) {
    this.props.ordersCount = ordersCount
  }

  get ordersCount() {
    return this.props.ordersCount
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
  }

  get category() {
    return this.props.category
  }
}
