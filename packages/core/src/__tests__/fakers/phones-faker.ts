import { fakerPT_BR as faker } from '@faker-js/faker'
import { Phone } from '../../domain/structs'

export class PhonesFaker {
  static fake() {
    return Phone.create({
      codeArea: faker.number.int({ min: 10, max: 99 }).toString(),
      number: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
    })
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => PhonesFaker.fake())
  }
}
