import { PAGINATION } from '@world-beauty/core/constants'
import type { ServiceDto } from '@world-beauty/core/dtos'
import type {
  ICustomersRepository,
  IOrdersRepository,
  IServicesRepository,
} from '@world-beauty/core/interfaces'
import { Service } from '@world-beauty/core/entities'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'
import type { PetType } from '@world-beauty/core/enums'

export const LocalStorageServicesRepository = (
  ordersRepository: IOrdersRepository,
  customersRepository: ICustomersRepository,
): IServicesRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return []

      const orders = await ordersRepository.findAll()
      const services = servicesDto.map((dto) => {
        const service = Service.create(dto)
        service.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === service.id ? 1 : 0)
        }, 0)
        return service
      })

      return services
    },

    async findMany(page: number) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return []

      const orders = await ordersRepository.findAll()
      const services = servicesDto.map((dto) => {
        const service = Service.create(dto)
        service.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === service.id ? 1 : 0)
        }, 0)
        return service
      })

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return services.slice(start, end)
    },

    async findManyByPetType(page: number, petType: PetType) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return { services: [], count: 0 }

      const orders = await ordersRepository.findAllByPetType(petType)

      const services = servicesDto.map((dto) => {
        const service = Service.create(dto)
        service.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === service.id ? 1 : 0)
        }, 0)
        return service
      })

      services.sort(
        (firstService, secondService) =>
          secondService.ordersCount - firstService.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        services: services.slice(start, end),
        count: services.length,
      }
    },

    async findManyByPetBreed(page: number, petBreed: string) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return { services: [], count: 0 }

      const orders = await ordersRepository.findAllByPetBreed(petBreed)

      const services = servicesDto.map((dto) => {
        const service = Service.create(dto)
        service.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === service.id ? 1 : 0)
        }, 0)
        return service
      })

      services.sort(
        (firstService, secondService) =>
          secondService.ordersCount - firstService.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        services: services.slice(start, end),
        count: services.length,
      }
    },

    async findManyByCustomerId(page: number, customerId: string) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto)
        return {
          services: [],
          count: 0,
        }

      const orders = await ordersRepository.findAllByCustomerId(customerId)
      const itemsIds = orders.map((order) => order.itemId)

      const customerServices: Service[] = []

      for (const serviceDto of servicesDto) {
        const service = Service.create(serviceDto)
        if (itemsIds.includes(service.id)) {
          service.ordersCount = orders.reduce((count, order) => {
            return count + (order.itemId === service.id ? 1 : 0)
          }, 0)
          customerServices.push(service)
        }
      }

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        services: customerServices.slice(start, end),
        count: customerServices.length,
      }
    },

    async findManyMostConsumedServices(page: number) {
      const services = await this.findAll()

      services.sort(
        (firstService, secondService) =>
          secondService.ordersCount - firstService.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        services: services.slice(start, end),
        count: services.length,
      }
    },

    async findManyMostConsumedServicesByCustomersGender(
      page: number,
      gender: 'male' | 'female',
    ) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return { services: [], count: 0 }

      const customers =
        gender === 'male'
          ? await customersRepository.findAllMale()
          : await customersRepository.findAllFemale()
      const customersIds = customers.map((customer) => customer.id)
      const orders = await ordersRepository.findAll()

      const services = servicesDto.map((dto) => {
        const service = Service.create(dto)
        service.ordersCount = orders.reduce((count, order) => {
          if (customersIds.includes(order.customerId) && order.itemId === service.id) {
            return count + 1
          }
          return count + 0
        }, 0)
        return service
      })

      services.sort(
        (firstService, secondService) =>
          secondService.ordersCount - firstService.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        services: services.slice(start, end),
        count: services.length,
      }
    },

    async count() {
      const constumers = await this.findAll()
      return constumers.length
    },

    async add(service: Service) {
      const services = await this.findAll()

      services.unshift(service)

      localStorage.set(
        KEYS.services,
        services.map((service) => service.dto),
      )
    },

    async update(service: Service) {
      const services = await this.findAll()

      localStorage.set(
        KEYS.services,
        services.map((currentService) => {
          return currentService.isEqualTo(service) ? service.dto : currentService.dto
        }),
      )
    },

    async removeMany(servicesIds: string[]) {
      const services = await this.findAll()

      localStorage.set(
        KEYS.services,
        services
          .filter((service) => !servicesIds.includes(service.id))
          .map((service) => service.dto),
      )
    },

    async removeAll() {
      localStorage.remove(KEYS.services)
    },
  }
}
