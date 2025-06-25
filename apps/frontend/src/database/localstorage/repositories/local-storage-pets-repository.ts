import { Pet } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type { ICustomersRepository, IPetsRepository } from '@world-beauty/core/interfaces'
import type { PetType } from '@world-beauty/core/enums'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStoragePetsRepository = (
  customersRepository: ICustomersRepository,
): IPetsRepository => {
  const localStorage = LocalStorage()

  return {
    async findById(id: string) {
      const pets = await this.findAll()
      return pets.find((pet) => pet.id === id)
    },

    async findAll() {
      const customersDto = await customersRepository.findAll()
      if (!customersDto) return []

      return customersDto.flatMap(
        (customer) =>
          customer.dto.pets?.map((petDto) => {
            return Pet.create({
              ...petDto,
              custumer: {
                id: customer.id as string,
                name: customer.name,
                cpf: customer.cpf.value,
              },
            })
          }) ?? [],
      )
    },

    async findAllBreeds() {
      const pets = await this.findAll()
      return pets.map((pet) => pet.breed)
    },

    async findMany(page: number) {
      const pets = await this.findAll()

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        pets: pets.slice(start, end),
        count: pets.length,
      }
    },

    async findAllByType(type: PetType) {
      const pets = await this.findAll()
      return pets.filter((pet) => pet.type === type)
    },

    async findAllByBreed(breed: string) {
      const pets = await this.findAll()
      return pets.filter((pet) => pet.breed === breed)
    },

    async add(pet: Pet) {
      const customer = await customersRepository.findById(pet.customer.id)
      if (!customer) return
      customer.addPet(pet)
      await customersRepository.update(customer)
    },

    async update(pet: Pet) {
      const customer = await customersRepository.findById(pet.customer.id)
      if (!customer) return
      customer.updatePet(pet)
      await customersRepository.update(customer)
    },

    async removeMany(petsIds: string[]) {
      for (const petId of petsIds) {
        const pet = await this.findById(petId)
        if (!pet) return

        const customer = await customersRepository.findByPetId(petId)
        if (!customer) return

        customer.deletePet(pet)
        await customersRepository.update(customer)
      }
    },

    async removeAll() {
      localStorage.remove(KEYS.pets)
    },
  }
}
