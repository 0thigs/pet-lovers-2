import { fakerPT_BR as faker } from '@faker-js/faker'

import type { DocumentDto } from '../../dtos'

export class RgsFaker {
  static fakeDto(): DocumentDto {
    return {
      value: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
      issueDate: faker.date.past(),
    }
  }

  static fakeManyDto(count: number) {
    return Array.from({ length: count }).map(() => RgsFaker.fakeDto())
  }
}
