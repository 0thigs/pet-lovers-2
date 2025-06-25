import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'
import type { PetType } from '../../enums/pet-type'

export class ListServicesByMostComsumptionAndPetTypeUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(page: number, petType: PetType) {
    const { services, count } = await this.servicesRepository.findManyByPetType(
      page,
      petType,
    )

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: count,
    })
  }
}
