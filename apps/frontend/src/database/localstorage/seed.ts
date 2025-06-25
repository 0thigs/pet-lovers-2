import { faker } from '@faker-js/faker'

import {
  CustomersFaker,
  PetsFaker,
  ProductsFaker,
  ServicesFaker,
} from '@world-beauty/core/fakers'
import {
  customersRepository,
  productsRepository,
  servicesRepository,
  ordersRepository,
} from '..'
import { Order } from '@world-beauty/core/structs'

export const Seed = async () => {
  const fakeProducts = ProductsFaker.fakeMany(20)
  await productsRepository.removeAll()
  for (const fakeProduct of fakeProducts) {
    await productsRepository.add(fakeProduct)
  }

  const fakeServices = ServicesFaker.fakeMany(10)
  await servicesRepository.removeAll()
  for (const fakeProduct of fakeServices) {
    await servicesRepository.add(fakeProduct)
  }

  await customersRepository.removeAll()
  await ordersRepository.removeAll()
  for (let index = 0; index < 30; index++) {
    const pet = PetsFaker.fake()
    const fakeCustomer = CustomersFaker.fake({ pets: [pet.dto] })

    for (let index = 0; index < faker.number.int({ min: 0, max: 10 }); index++) {
      const fakeProduct =
        fakeProducts[faker.number.int({ min: 0, max: fakeProducts.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeProduct.price,
        itemId: fakeProduct.id,
        petId: pet.id,
      })
      await ordersRepository.add(order)
    }

    for (let index = 0; index < faker.number.int({ min: 0, max: 5 }); index++) {
      const fakeService =
        fakeServices[faker.number.int({ min: 0, max: fakeServices.length - 1 })]
      const order = Order.create({
        customerId: fakeCustomer.id,
        amount: fakeService.price,
        itemId: fakeService.id,
        petId: pet.id,
      })
      await ordersRepository.add(order)
    }

    await customersRepository.add(fakeCustomer)
  }
}
