import type { Customer } from '../../domain/entities'
import type { ICustomersRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses/pagination'

export class ListCustomersByGenderUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(gender: 'male' | 'female', page: number) {
    let customersPagination: { customers: Customer[]; count: number } = {
      customers: [],
      count: 0,
    }

    if (gender === 'male') {
      customersPagination = await this.customersRepository.findManyMale(page)
    } else {
      customersPagination = await this.customersRepository.findManyFemale(page)
    }

    return new PaginationResponse({
      items: customersPagination.customers.map((customer) => customer.dto),
      itemsCount: customersPagination.count,
    })
  }
}
