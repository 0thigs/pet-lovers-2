import type { IProductsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'
import type { PetType } from '../../enums/pet-type'

export class ListProductsByMostComsumptionAndPetTypeUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(page: number, petType: PetType) {
    const { products, count } = await this.productsRepository.findManyByPetType(
      page,
      petType,
    )

    return new PaginationResponse({
      items: products.map((product) => product.dto),
      itemsCount: count,
    })
  }
}
