import { Component } from 'react'

import { ListServicesByMostComsumptionAndPetTypeUseCase } from '@world-beauty/core/use-cases'
import { Service } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type { PetType } from '@world-beauty/core/enums'

import { servicesRepository } from '@/database'
import { ServicesTable } from '@/components/commons/services-table'

type Props = {
  selectedPetType: PetType
}

type State = {
  services: Service[]
  servicesPage: number
  servicesPagesCount: number
}

export class MostConsumedServicesTableByPetType extends Component<Props, State> {
  private readonly useCase = new ListServicesByMostComsumptionAndPetTypeUseCase(
    servicesRepository,
  )

  constructor(props: Props) {
    super(props)
    this.state = {
      services: [],
      servicesPage: 1,
      servicesPagesCount: 0,
    }
  }

  async fetchServices(page: number, petType: PetType) {
    const { items, itemsCount } = await this.useCase.execute(page, petType)

    this.setState({
      services: items.map(Service.create),
      servicesPage: page,
      servicesPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleServicesPageChange(page: number) {
    await this.fetchServices(page, this.props.selectedPetType)
  }

  async componentDidMount() {
    await this.fetchServices(1, this.props.selectedPetType)
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedPetType !== this.props.selectedPetType) {
      await this.fetchServices(1, this.props.selectedPetType)
    }
  }

  render() {
    return (
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Serviços mais consumidos por pet's do tipo{' '}
          {this.props.selectedPetType.toLocaleLowerCase()}
        </h2>
        <ServicesTable
          hasActions={false}
          hasSelection={false}
          services={this.state.services}
          page={this.state.servicesPage}
          pagesCount={this.state.servicesPagesCount}
          onPageChange={(page) => this.handleServicesPageChange(page)}
        />
      </div>
    )
  }
}
