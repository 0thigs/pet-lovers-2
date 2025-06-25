import type { IPetsRepository } from '../../interfaces'

export class GetAllBreedsUseCase {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async execute() {
    const breeds = await this.petsRepository.findAllBreeds()
    return Array.from(new Set(breeds))
  }
}
