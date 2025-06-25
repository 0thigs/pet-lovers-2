import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListProductsByMostComsumptionAndPetBreedUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(page: number, petBreed: string) {
    const { products, count } = await this.productsRepository.findManyByPetBreed(
      page,
      petBreed,
    )

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
