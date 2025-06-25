import { Component } from 'react'

import { Select } from '@nextui-org/react'
import { SelectItem } from '@nextui-org/react'
import { MostConsumedServicesTableByPetBreed } from './most-consumed-services-table-by-breed'
import { MostConsumedProductsTableByPetBreed } from './most-consumed-products-table-by-pet-breed'
import { GetAllBreedsUseCase } from '@world-beauty/core/use-cases'

import { petsRepository } from '@/database'

type State = {
  selectedBreed: string
  breeds: string[]
}

export class MostConsumedProductsAndServicesByPetBreedTable extends Component<
  any,
  State
> {
  private useCase = new GetAllBreedsUseCase(petsRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      selectedBreed: '',
      breeds: [],
    }
  }

  handleSelectChange(value: string) {
    this.setState({ selectedBreed: value })
  }

  async fetchBreeds() {
    const breeds = await this.useCase.execute()
    this.setState({ breeds, selectedBreed: breeds[0] })
  }

  async componentDidMount() {
    await this.fetchBreeds()
  }

  render() {
    return (
      <div className='space-y-6'>
        <Select
          name='type'
          className='max-w-xs'
          label='Raça de pet'
          selectedKeys={[this.state.selectedBreed]}
          onSelectionChange={(value) =>
            this.handleSelectChange(value.currentKey as string)
          }
          items={this.state.breeds.map((breed) => ({
            label: breed,
            value: breed,
          }))}
          required
        >
          {(type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.value.toLocaleLowerCase()}
            </SelectItem>
          )}
        </Select>
        <MostConsumedProductsTableByPetBreed
          selectedPetBreed={this.state.selectedBreed}
        />
        <MostConsumedServicesTableByPetBreed
          selectedPetBreed={this.state.selectedBreed}
        />
      </div>
    )
  }
}
