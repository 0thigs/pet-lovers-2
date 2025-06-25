import { Component, type FormEvent } from 'react'
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react'

import type { PetDto } from '@world-beauty/core/dtos'
import type { Customer, Pet } from '@world-beauty/core/entities'
import { PetType } from '@world-beauty/core/enums'

import { customersRepository } from '@/database'

type PetFormProps = {
  pet?: Pet
  onSubmit: (Pet: PetDto) => void
  onCancel: () => void
}

type PetFormState = {
  customers: Customer[]
}

export class PetForm extends Component<PetFormProps, PetFormState> {
  constructor(props: PetFormProps) {
    super(props)
    this.state = {
      customers: [],
    }
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(event.target)

    const name = String(formData.get('name'))
    const type = String(formData.get('type'))
    const breed = String(formData.get('breed'))
    const gender = String(formData.get('gender'))
    const customerId = String(formData.get('customerId'))

    const petDto: PetDto = {
      id: this.props.pet?.id,
      name,
      type,
      breed,
      gender,
      custumer: {
        id: customerId,
      },
    }

    if (this.props.pet) {
      const updatedPet = this.props.pet.update(petDto)
      this.props.onSubmit(updatedPet.dto)
      return
    }

    this.props.onSubmit(petDto)
  }

  async fetchCustomers() {
    const customers = await customersRepository.findAll()
    this.setState({ customers })
  }

  async componentDidMount() {
    await this.fetchCustomers()
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <Input
            autoFocus
            label='Nome'
            name='name'
            defaultValue={this.props.pet?.name}
            variant='bordered'
            required
          />

          <Input
            label='Raça'
            name='breed'
            defaultValue={this.props.pet?.breed}
            variant='bordered'
            required
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <Select
            name='gender'
            defaultSelectedKeys={this.props.pet ? [this.props.pet.gender] : undefined}
            className='w-full md:max-w-xs'
            label='Gênero'
            required
          >
            <SelectItem key='male' value='male'>
              Macho
            </SelectItem>
            <SelectItem key='female' value='female'>
              Fêmea
            </SelectItem>
          </Select>

          <Select
            name='type'
            className='w-full md:max-w-xs'
            label='Tipo de pet'
            defaultSelectedKeys={this.props.pet ? [this.props.pet.type] : undefined}
            items={Object.values(PetType).map((type) => ({ label: type, value: type }))}
            required
          >
            {(type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.value.toLocaleLowerCase()}
              </SelectItem>
            )}
          </Select>
        </div>

      {!this.props.pet && <Select
          label='Cliente'
          name='customerId'
          placeholder={this.state.customers.length > 0 ? 'Selecione um cliente' : 'Nenhum cliente cadastrado'}
          isDisabled={this.state.customers.length === 0}
          items={this.state.customers.map((customer) => ({
            label: `${customer.name} - CPF: ${customer.cpf.format}`,
            value: customer.id,
          }))}
          required
        >
          {(customer) => (
            <SelectItem key={customer.value} value={customer.value}>
              {customer.label}
            </SelectItem>
          )}
        </Select>}
        <Divider />
        <div className='flex items-center gap-2'>
          <Button type='submit' color='primary' className='mt-3'>
            Enviar
          </Button>
          <Button color='danger' onClick={() => this.props.onCancel()} className='mt-3'>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }
}
