import { Pet } from '../../domain/entities'
import type { PetDto } from '../../dtos'
import type { IPetsRepository } from '../../interfaces/repositories'

export class UpdatePetUseCase {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async execute(petDto: PetDto) {
    const pet = Pet.create(petDto)
    await this.petsRepository.update(pet)
  }
}
