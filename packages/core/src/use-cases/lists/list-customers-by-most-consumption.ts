import type { ICustomersRepository } from '../../interfaces'

export class ListCustomersByMostConsumptionUseCase {
    constructor(private readonly customersRepository: ICustomersRepository) { }

    async execute() {
        const customers = await this.customersRepository.findTop10CustomersByMostConsumption()
        return customers.map(customer => customer.dto)
    }
}
