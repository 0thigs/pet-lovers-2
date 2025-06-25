import { fakerPT_BR as faker } from '@faker-js/faker'
import type { ProductDto } from '../../dtos'
import { Product } from '../../domain/entities'

export class ProductsFaker {
  static fake(dto?: Partial<ProductDto>) {
    return Product.create(ProductsFaker.fakeDto(dto))
  }

  static fakeDto(dto?: Partial<ProductDto>): ProductDto {
    return {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription().slice(0, 50),
      category: 'product',
      ...dto,
    }
  }

  static fakeMany(count: number, dto?: Partial<ProductDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => ProductsFaker.fake(dto))
  }

  static fakeManyDto(count: number, dto?: Partial<ProductDto>) {
    return Array.from({ length: count }).map(() => ProductsFaker.fakeDto(dto))
  }
}
