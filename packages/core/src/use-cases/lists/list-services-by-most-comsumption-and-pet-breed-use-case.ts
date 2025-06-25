import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListServicesByMostComsumptionAndPetBreedUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(page: number, petBreed: string) {
    const { services, count } = await this.servicesRepository.findManyByPetBreed(
      page,
      petBreed,
    )

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: count,
    })
  }
}
