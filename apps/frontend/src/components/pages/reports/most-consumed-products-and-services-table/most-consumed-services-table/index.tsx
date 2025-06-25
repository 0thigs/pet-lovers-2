import { Component } from 'react'

import { ListMostConsumedServicesUseCase } from '@world-beauty/core/use-cases'
import { Service } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

import { servicesRepository } from '@/database'
import { ServicesTable } from '@/components/commons/services-table'

type ServicesPageState = {
  services: Service[]
  page: number
  pagesCount: number
  selectedServicesIds: string[]
}

export class MostConsumedServicesTable extends Component<any, ServicesPageState> {
  private readonly listMostConsumedServices = new ListMostConsumedServicesUseCase(
    servicesRepository,
  )

  constructor(props: any) {
    super(props)
    this.state = {
      services: [],
      page: 1,
      pagesCount: 0,
      selectedServicesIds: [],
    }
  }

  async fetchServices(page: number) {
    const { items, itemsCount } = await this.listMostConsumedServices.execute(page)

    console.log('items', items)

    this.setState({
      services: items.map(Service.create),
      page,
      pagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handlePageChange(page: number) {
    await this.fetchServices(page)
  }

  async componentDidMount() {
    await this.fetchServices(this.state.page)
  }

  render() {
    return (
      <ServicesTable
        hasSelection={false}
        hasActions={false}
        services={this.state.services}
        page={this.state.page}
        pagesCount={this.state.pagesCount}
        onPageChange={(page) => this.handlePageChange(page)}
      />
    )
  }
}
