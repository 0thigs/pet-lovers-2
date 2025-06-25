import { Component, type FormEvent } from 'react'
import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import type { ServiceDto } from '@world-beauty/core/dtos'
import type { Service } from '@world-beauty/core/entities'

type ServiceFormProps = {
  service?: Service
  onSubmit: (Service: ServiceDto) => void
  onCancel: () => void
}

type ServiceFormState = {
  rgFieldsCount: number
  phoneFieldsCount: number
}

export class ServiceForm extends Component<ServiceFormProps, ServiceFormState> {
  constructor(props: ServiceFormProps) {
    super(props)
    this.state = {
      rgFieldsCount: 1,
      phoneFieldsCount: 1,
    }
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(event.target)

    const name = String(formData.get('name'))
    const price = Number(formData.get('price'))
    const description = String(formData.get('description'))

    const serviceDto: ServiceDto = {
      name,
      price,
      description,
    }

    if (this.props.service) {
      const updatedService = this.props.service.update(serviceDto)
      this.props.onSubmit(updatedService.dto)
      return
    }

    this.props.onSubmit(serviceDto)
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            autoFocus
            label='Nome'
            name='name'
            defaultValue={this.props.service?.name}
            variant='bordered'
            required
          />
          <Input
            label='Preço'
            name='price'
            defaultValue={this.props.service?.priceAsNumber.toString()}
            variant='bordered'
            required
          />
        </div>
        <Divider />
        <Textarea
          label='Descrição'
          name='description'
          variant='bordered'
          defaultValue={this.props.service?.description}
        />
        <div className='flex items-center gap-2'>
          <Button type='submit' color='primary' className='mt-3'>
            Cadastrar
          </Button>
          <Button color='danger' onClick={() => this.props.onCancel()} className='mt-3'>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }
}
