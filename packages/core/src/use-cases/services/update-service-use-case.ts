import { Service } from '../../domain/entities'
import type { ServiceDto } from '../../dtos'
import type { IServicesRepository } from '../../interfaces/repositories'

export class UpdateServiceUseCase {
  constructor(private readonly ServicesRepository: IServicesRepository) {}

  async execute(ServiceDto: ServiceDto) {
    const service = Service.create(ServiceDto)
    await this.ServicesRepository.update(service)
  }
}
