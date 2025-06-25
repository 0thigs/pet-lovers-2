import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListMostConsumedServicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(servicesPage: number) {
    const { services, count } =
      await this.servicesRepository.findManyMostConsumedServices(servicesPage)

    return new PaginationResponse({
      items: services.map((service) => service.dto),
      itemsCount: count,
    })
  }
}
