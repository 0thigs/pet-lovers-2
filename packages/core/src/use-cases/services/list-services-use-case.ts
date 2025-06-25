import type { IServicesRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListServicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(page: number) {
    const [products, productsCount] = await Promise.all([
      this.servicesRepository.findMany(page),
      this.servicesRepository.count(),
    ])

    return new PaginationResponse({ items: products, itemsCount: productsCount })
  }
}
