import { fakerPT_BR as faker } from '@faker-js/faker'
import type { ServiceDto } from '../../dtos'
import { Service } from '../../domain/entities'

export class ServicesFaker {
  static fake(dto?: Partial<ServiceDto>) {
    return Service.create(ServicesFaker.fakeDto(dto))
  }

  static fakeDto(dto?: Partial<ServiceDto>): ServiceDto {
    return {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription().slice(0, 50),
      category: 'service',
      ...dto,
    }
  }

  static fakeMany(count: number, dto?: Partial<ServiceDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => ServicesFaker.fake(dto))
  }

  static fakeManyDto(count: number, dto?: Partial<ServiceDto>) {
    return Array.from({ length: count }).map(() => ServicesFaker.fakeDto(dto))
  }
}
