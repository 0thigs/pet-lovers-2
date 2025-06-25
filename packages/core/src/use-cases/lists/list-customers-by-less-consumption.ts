import type { ICustomersRepository } from '../../interfaces'

export class ListCustomersByLessConsumptionUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute() {
    const customers = await this.customersRepository.findTop10CustomersByLessConsumption()
    return customers.map((customer) => customer.dto)
  }
}
