import type { ProductDto } from '@world-beauty/core/dtos'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type {
  IProductsRepository,
  IOrdersRepository,
  ICustomersRepository,
} from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'
import type { PetType } from '@world-beauty/core/enums'

export const LocalStorageProductsRepository = (
  ordersRepository: IOrdersRepository,
  customersRepository: ICustomersRepository,
): IProductsRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return []

      const orders = await ordersRepository.findAll()
      const products = productsDto.map((dto) => {
        const product = Product.create(dto)
        product.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === product.id ? 1 : 0)
        }, 0)
        return product
      })

      return products
    },

    async findMany(page: number) {
      const products = await this.findAll()

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return products.slice(start, end)
    },

    async findManyByCustomerId(page: number, customerId: string) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto)
        return {
          products: [],
          count: 0,
        }

      const orders = await ordersRepository.findAllByCustomerId(customerId)
      const itemsIds = orders.map((order) => order.itemId)

      const customerProducts: Product[] = []

      for (const productDto of productsDto) {
        const product = Product.create(productDto)
        if (itemsIds.includes(product.id)) {
          product.ordersCount = orders.reduce((count, order) => {
            return count + (order.itemId === product.id ? 1 : 0)
          }, 0)
          customerProducts.push(product)
        }
      }

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: customerProducts.slice(start, end),
        count: customerProducts.length,
      }
    },

    async findManyByPetType(page: number, petType: PetType) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return { products: [], count: 0 }

      const orders = await ordersRepository.findAllByPetType(petType)

      const products = productsDto.map((dto) => {
        const product = Product.create(dto)
        product.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === product.id ? 1 : 0)
        }, 0)
        return product
      })

      products.sort(
        (firstProduct, secondProduct) =>
          secondProduct.ordersCount - firstProduct.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async findManyByPetBreed(page: number, petBreed: string) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return { products: [], count: 0 }

      console.log({petBreed})
      const orders = await ordersRepository.findAllByPetBreed(petBreed)

      const products = productsDto.map((dto) => {
        const product = Product.create(dto)
        product.ordersCount = orders.reduce((count, order) => {
          return count + (order.itemId === product.id ? 1 : 0)
        }, 0)
        return product
      })

      products.sort(
        (firstProduct, secondProduct) =>
          secondProduct.ordersCount - firstProduct.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async findManyMostConsumedProducts(page: number) {
      const products = await this.findAll()

      products.sort(
        (firstProduct, secondProduct) =>
          secondProduct.ordersCount - firstProduct.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async findManyMostConsumedProductsByCustomersGender(
      page: number,
      gender: 'male' | 'female',
    ) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return { products: [], count: 0 }

      const customers =
        gender === 'male'
          ? await customersRepository.findAllMale()
          : await customersRepository.findAllFemale()
      const customersIds = customers.map((customer) => customer.id)
      const orders = await ordersRepository.findAll()

      const products = productsDto.map((dto) => {
        const product = Product.create(dto)
        product.ordersCount = orders.reduce((count, order) => {
          if (customersIds.includes(order.customerId) && order.itemId === product.id) {
            return count + 1
          }
          return count + 0
        }, 0)
        return product
      })

      products.sort(
        (firstProduct, secondProduct) =>
          secondProduct.ordersCount - firstProduct.ordersCount,
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async count() {
      const products = await this.findAll()
      return products.length
    },

    async add(product: Product) {
      const products = await this.findAll()

      products.unshift(product)

      localStorage.set(
        KEYS.products,
        products.map((product) => product.dto),
      )
    },

    async update(product: Product) {
      const products = await this.findAll()

      localStorage.set(
        KEYS.products,
        products.map((currentProduct) => {
          return currentProduct.isEqualTo(product) ? product.dto : currentProduct.dto
        }),
      )
    },

    async removeMany(productsIds: string[]) {
      const products = await this.findAll()

      localStorage.set(
        KEYS.products,
        products
          .filter((product) => !productsIds.includes(product.id))
          .map((product) => product.dto),
      )
    },

    async removeAll() {
      localStorage.remove(KEYS.products)
    },
  }
}
