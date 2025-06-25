import type { Pet } from '../../domain/entities/pet'
import type { PetType } from '../../enums/pet-type'

export interface IPetsRepository {
  findById(id: string): Promise<Pet | undefined>
  findAll(): Promise<Pet[]>
  findAllBreeds(): Promise<string[]>
  findMany(page: number): Promise<{ pets: Pet[]; count: number }>
  findAllByType(type: PetType): Promise<Pet[]>
  findAllByBreed(breed: string): Promise<Pet[]>
  removeAll(): Promise<void>
  removeMany(petIds: string[]): Promise<void>
  add(pet: Pet): Promise<void>
  update(pet: Pet): Promise<void>
}
