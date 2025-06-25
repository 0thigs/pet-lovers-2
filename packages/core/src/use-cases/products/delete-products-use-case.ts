import type { IProductsRepository } from '../../interfaces'

export class DeleteProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute(productsIds: string[]) {
    await this.productsRepository.removeMany(productsIds)
  }
}
