import { Component } from 'react'
import { Button } from '@nextui-org/react'

import {
  DeleteServicesUseCase,
  ListServicesUseCase,
  RegisterServiceUseCase,
  UpdateServiceUseCase,
} from '@world-beauty/core/use-cases'
import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { servicesRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServiceForm } from './service-form'
import { ServicesTable } from '@/components/commons/services-table'

type ServicesPageState = {
  services: Service[]
  page: number
  pagesCount: number
  selectedServicesIds: string[]
}

export class ServicesPage extends Component<any, ServicesPageState> {
  private readonly listServicesUseCase = new ListServicesUseCase(servicesRepository)
  private readonly registerServiceUseCase = new RegisterServiceUseCase(servicesRepository)
  private readonly updateServiceUseCase = new UpdateServiceUseCase(servicesRepository)
  private readonly deleteServicesUseCase = new DeleteServicesUseCase(servicesRepository)

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
    const response = await this.listServicesUseCase.execute(page)
    this.setState({
      services: response.items,
      pagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handleServicesSelectionChange(selectedServicesIds: string[]) {
    this.setState({
      selectedServicesIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchServices(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedServicesIds: [] })
    await this.deleteServicesUseCase.execute(this.state.selectedServicesIds)
    await this.fetchServices(1)
  }

  async handleUpdateService(serviceDto: ServiceDto) {
    await this.updateServiceUseCase.execute(serviceDto)
    await this.fetchServices(1)
  }

  async handleSubmit(
    serviceDto: ServiceDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await this.registerServiceUseCase.execute(serviceDto)
    } else {
      await this.updateServiceUseCase.execute(serviceDto)
    }
    await this.fetchServices(1)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchServices(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3 pb-24 bg-zinc-50'>
        <PageTitle>Serviços</PageTitle>

        <div className='flex items-center gap-2'>
          <Dialog
            title='Adicionar serviço'
            trigger={(openDialog) => (
              <Button
                endContent={<Icon name='add' size={20} />}
                radius='sm'
                onClick={openDialog}
                className='bg-zinc-800 text-zinc-50 w-max'
              >
                Cadastrar serviço
              </Button>
            )}
          >
            {(closeDialog) => (
              <ServiceForm
                onCancel={closeDialog}
                onSubmit={(ServiceDto) =>
                  this.handleSubmit(ServiceDto, closeDialog, 'register')
                }
              />
            )}
          </Dialog>
          {this.state.selectedServicesIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar serviço(s)
            </Button>
          )}
        </div>

        <div className='w-full'>
          <ServicesTable
            hasActions={true}
            hasSelection={true}
            services={this.state.services}
            page={this.state.page}
            pagesCount={this.state.pagesCount}
            selectedServicesIds={this.state.selectedServicesIds}
            onUpdateService={(serviceDto) => this.handleUpdateService(serviceDto)}
            onPageChange={(page) => this.handlePageChange(page)}
            onServicesSelectionChange={(servicesIds) =>
              this.handleServicesSelectionChange(servicesIds)
            }
          />
        </div>
      </div>
    )
  }
}
