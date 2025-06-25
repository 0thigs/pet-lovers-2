import type { IPetsRepository } from '../../interfaces'

export class DeletePetsUseCase {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async execute(petsIds: string[]) {
    await this.petsRepository.removeMany(petsIds)
  }
}
