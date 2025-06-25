import type { ICustomersRepository } from '../../interfaces/repositories'

export class DeleteCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customersIds: string[]) {
    await this.customersRepository.removeMany(customersIds)
  }
}
