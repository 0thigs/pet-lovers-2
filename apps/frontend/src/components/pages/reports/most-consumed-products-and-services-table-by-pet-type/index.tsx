import { Component } from 'react'

import { Select, SelectItem } from '@nextui-org/react'
import { PetType } from '@world-beauty/core/enums'

import { MostConsumedProductsTableByPetType } from './most-consumed-products-table-by-pet-type'
import { MostConsumedServicesTableByPetType } from './most-consumed-services-table-by-pet-type'

type State = {
  selectedPetType: PetType
}

export class MostConsumedProductsAndServicesByPetTypeTable extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      selectedPetType: PetType.CACHORRO,
    }
  }

  handlePetTypeChange = (petType: string) => {
    this.setState({
      selectedPetType: petType as PetType,
    })
  }

  render() {
    return (
      <div className='space-y-6'>
        <Select
          name='type'
          className='max-w-xs'
          label='Tipo de pet'
          selectedKeys={[this.state.selectedPetType]}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0] as string
            this.handlePetTypeChange(selectedKey)
          }}
          items={Object.values(PetType).map((type) => ({ label: type, value: type }))}
          required
        >
          {(type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.value.toLocaleLowerCase()}
            </SelectItem>
          )}
        </Select>

        <MostConsumedProductsTableByPetType
          selectedPetType={this.state.selectedPetType}
        />
        <MostConsumedServicesTableByPetType
          selectedPetType={this.state.selectedPetType}
        />
      </div>
    )
  }
}
