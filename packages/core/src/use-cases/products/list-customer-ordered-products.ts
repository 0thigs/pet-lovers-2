import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListCustomerOrderedProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(customerId: string, page: number) {
    const { products, count } = await this.productsRepository.findManyByCustomerId(
      page,
      customerId,
    )

    return new PaginationResponse({ items: products, itemsCount: count })
  }
}
