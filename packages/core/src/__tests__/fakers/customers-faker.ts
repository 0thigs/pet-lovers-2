import { fakerPT_BR as faker } from '@faker-js/faker'

import { PhonesFaker } from './phones-faker'
import { RgsFaker } from './rgs-faker'
import { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'

export class CustomersFaker {
  static fake(dto?: Partial<CustomerDto>) {
    return Customer.create(CustomersFaker.fakeDto(dto))
  }

  static fakeDto(dto?: Partial<CustomerDto>): CustomerDto {
    return {
      name: faker.person.firstName(),
      socialName: faker.person.lastName(),
      cpf: {
        value: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
        issueDate: faker.date.past(),
      },
      gender: faker.helpers.arrayElement(['male', 'female']),
      phones: PhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 })),
      rgs: RgsFaker.fakeManyDto(1),
      ...dto,
    }
  }

  static fakeMany(count: number, dto?: Partial<CustomerDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fake(dto))
  }

  static fakeManyDto(count: number, dto?: Partial<CustomerDto>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fakeDto(dto))
  }
}
