import { Component } from 'react'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'

import type { ServiceDto } from '@world-beauty/core/dtos'
import { ListAllServicesUseCase } from '@world-beauty/core/use-cases'

import { servicesRepository } from '@/database'

type ServicesDialogProps = {
  defaultServicesIds: string[]
  onChange: (servicesDto: ServiceDto[]) => void
}

type ServicesDialogState = {
  services: ServiceDto[]
}

export class ServicesDialog extends Component<ServicesDialogProps, ServicesDialogState> {
  private readonly listAllServicesUseCase = new ListAllServicesUseCase(servicesRepository)

  constructor(props: ServicesDialogProps) {
    super(props)
    this.state = {
      services: [],
    }
  }

  async fetchServices() {
    const servicesDto = await this.listAllServicesUseCase.execute()
    this.setState({ services: servicesDto })
  }

  handleCheckboxChange(servicesIds: string[]) {
    this.props.onChange(
      this.state.services.filter((service) => servicesIds.includes(String(service.id))),
    )
  }

  async componentDidMount() {
    await this.fetchServices()
  }

  render() {
    return (
      <>
        <CheckboxGroup
          label='Selecione um serviço'
          defaultValue={[]}
          className='grid grid-cols-3'
          onChange={(values) => this.handleCheckboxChange(values)}
        >
          {this.state.services.map((service) => (
            <Checkbox key={String(service.id)} value={String(service.id)}>
              {service.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </>
    )
  }
}
