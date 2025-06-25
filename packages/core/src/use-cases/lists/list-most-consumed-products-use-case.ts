import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListMostConsumedProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productsPage: number) {
    const { products, count } =
      await this.productsRepository.findManyMostConsumedProducts(productsPage)

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
