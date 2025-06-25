import type { ICustomersRepository } from '../../interfaces/repositories'
import { PaginationResponse } from '../../responses/pagination'

export class ListCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(page: number) {
    const { customers, count } = await this.customersRepository.findMany(page)
    return new PaginationResponse({
      items: customers.map((customer) => customer.dto),
      itemsCount: count,
    })
  }
}
