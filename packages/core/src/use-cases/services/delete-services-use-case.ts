import type { IServicesRepository } from '../../interfaces'

export class DeleteServicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(servicesIds: string[]) {
    await this.servicesRepository.removeMany(servicesIds)
  }
}
