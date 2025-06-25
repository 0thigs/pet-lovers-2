import type { ItemDto } from '../../dtos/item-dto'
import { Item } from '../abstracts/item'

export class Service extends Item {
  static create(dto: ItemDto): Service {
    return new Service(dto, dto.id)
  }

  update(dto: ItemDto): Service {
    return Service.create({ ...this.dto, ...dto })
  }

  get dto(): ItemDto {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      price: this.props.price,
      category: 'service',
      ordersCount: this.ordersCount,
    }
  }
}
