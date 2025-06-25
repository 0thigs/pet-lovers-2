import { Pet } from '../../domain/entities'
import type { PetProps } from '../../domain/entities/pet'
import { PetType } from '../../enums'
import { fakerPT_BR as faker } from '@faker-js/faker'

const breeds = [faker.animal.dog(), faker.animal.cat(), faker.animal.bird()]

export class PetsFaker {
  static fake(props?: Partial<PetProps>) {
    return Pet.create({
      name: faker.animal.dog(),
      type: faker.helpers.arrayElement([
        PetType.CACHORRO,
        PetType.GATO,
        PetType.PASSARO,
        PetType.ROEDOR,
        PetType.REPTIL,
        PetType.PEIXE,
      ]),
      breed: faker.helpers.arrayElement(breeds),
      gender: faker.helpers.arrayElement(['male', 'female']),
      custumer: {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        cpf: faker.string.uuid(),
      },
      ...props,
    })
  }
}
