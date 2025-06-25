import { Item } from '../abstracts/item'
import type { ItemDto } from '../../dtos/item-dto'

export class Product extends Item {
  static create(dto: ItemDto): Product {
    return new Product(dto, dto.id)
  }

  update(dto: ItemDto): Product {
    return Product.create({ ...this.dto, ...dto })
  }

  get dto(): ItemDto {
    return {
      id: this.id,
      description: this.description,
      name: this.name,
      price: this.props.price,
      category: 'product',
      ordersCount: this.ordersCount,
    }
  }
}
