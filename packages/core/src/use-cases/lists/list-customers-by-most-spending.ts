import type { ICustomersRepository } from '../../interfaces'

export class ListCustomersByMostSpendingUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute() {
    const customers = await this.customersRepository.findTop5CustomersByMostSpending()
    return customers.map((customer) => customer.dto)
  }
}
