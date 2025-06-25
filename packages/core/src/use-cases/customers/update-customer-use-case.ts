import { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'
import type { ICustomersRepository } from '../../interfaces/repositories'

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customerDto: CustomerDto) {
    const customer = Customer.create(customerDto)
    await this.customersRepository.update(customer)
  }
}
