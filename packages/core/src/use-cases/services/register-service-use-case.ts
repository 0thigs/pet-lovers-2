import { Service } from '../../domain/entities'
import type { ServiceDto } from '../../dtos'
import type { IServicesRepository } from '../../interfaces/repositories'

export class RegisterServiceUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute(serviceDto: ServiceDto) {
    const service = Service.create(serviceDto)
    await this.servicesRepository.add(service)
  }
}
