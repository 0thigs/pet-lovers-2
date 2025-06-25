import type { IPetsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListPetsUseCase {
  constructor(private readonly petsRepository: IPetsRepository) {}

  async execute(page: number) {
    const { pets, count } = await this.petsRepository.findMany(page)
    return new PaginationResponse({
      items: pets.map((pet) => pet.dto),
      itemsCount: count,
    })
  }
}
