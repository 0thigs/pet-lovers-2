import type { CustomerDto, OrderDto, PetDto } from '@world-beauty/core/dtos'
import { Order } from '@world-beauty/core/structs'
import type { IOrdersRepository } from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'
import type { PetType } from '@world-beauty/core/enums'

export const LocalStorageOrdersRepository = (): IOrdersRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      return ordersDto.map(Order.create)
    },

    async findAllByCustomerId(customerId: string) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      const orders: Order[] = []
      for (const orderDto of ordersDto) {
        if (orderDto.customerId === customerId) orders.push(Order.create(orderDto))
      }

      return orders
    },

    async findAllByPetType(petType: PetType) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      const customers = localStorage.get<CustomerDto[]>(KEYS.customers)
      if (!customers) return []

      const petsIds = customers
        .flatMap((customer) => customer.pets)
        .filter((pet) => pet?.type === petType)
        .map((pet) => pet?.id)

      const orders = ordersDto.map(Order.create)

      return orders.filter((order) => petsIds.includes(order.petId))
    },

    async findAllByPetBreed(petBreed: string) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders)
      if (!ordersDto) return []

      const customers = localStorage.get<CustomerDto[]>(KEYS.customers)
      if (!customers) return []

      const petsIds = customers
        .flatMap((customer) => customer.pets)
        .filter((pet) => pet?.breed === petBreed)
        .map((pet) => pet?.id)

      const orders = ordersDto.map(Order.create)

      return orders.filter((order) => petsIds.includes(order.petId))
    },

    async add(order: Order) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders) ?? []

      ordersDto.push(order.dto)
      localStorage.set(KEYS.orders, ordersDto)
    },

    async addMany(orders: Order[]) {
      const ordersDto = localStorage.get<OrderDto[]>(KEYS.orders) ?? []
      localStorage.set(KEYS.orders, [...ordersDto, ...orders.map((order) => order.dto)])
    },

    async removeAll() {
      localStorage.remove(KEYS.orders)
    },
  }
}
