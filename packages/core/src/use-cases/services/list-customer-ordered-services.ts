import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListCustomerOrderedservicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(customerId: string, page: number) {
    const { services, count } = await this.servicesRepository.findManyByCustomerId(
      page,
      customerId,
    )

    return new PaginationResponse({ items: services, itemsCount: count })
  }
}
