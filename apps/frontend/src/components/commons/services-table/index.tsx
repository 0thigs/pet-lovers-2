import { Component } from 'react'
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  type Selection,
} from '@nextui-org/react'

import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServiceForm } from './service-form'

type ServicesTableProps = {
  services: Service[]
  page: number
  pagesCount: number
  hasActions: boolean
  isLoading?: boolean
  hasSelection?: boolean
  selectedServicesIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateService?: (serviceDto: ServiceDto) => void
  onServicesSelectionChange?: (servicesIds: string[]) => void
}

export class ServicesTable extends Component<ServicesTableProps> {
  async handleServicesSelectionChange(servicesSelection: Selection) {
    let selectedServicesIds: string[] = []

    if (servicesSelection === 'all') {
      selectedServicesIds = this.props.services.map((service) => service.id)
    } else {
      selectedServicesIds = Array.from(servicesSelection).map(String)
    }

    if (this.props.onServicesSelectionChange)
      this.props.onServicesSelectionChange(selectedServicesIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdateService(serviceDto: ServiceDto) {
    if (this.props.onUpdateService) this.props.onUpdateService(serviceDto)
  }

  render() {
    return (
      <Table
        key={this.props.pagesCount}
        color='default'
        selectionMode={this.props.hasSelection ? 'multiple' : 'none'}
        selectedKeys={this.props.selectedServicesIds}
        aria-label='Tabela de serviços'
        onSelectionChange={(selection) => this.handleServicesSelectionChange(selection)}
        bottomContent={
          this.props.pagesCount > 1 && (
            <Pagination
              color='primary'
              total={this.props.pagesCount}
              initialPage={this.props.page}
              onChange={(page) => this.handlePageChange(page)}
            />
          )
        }
        className='w-full'
        checkboxesProps={{
          classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background',
          },
        }}
      >
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Preço</TableColumn>
          <TableColumn>Descrição</TableColumn>
          <TableColumn>Qtd. de clientes que consumiram esse serviço</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={this.props.isLoading}
          loadingContent={<Spinner />}
          emptyContent='Nenhum serviço cadastrado'
          items={this.props.services}
        >
          {(service) => (
            <TableRow key={service.id}>
               <TableCell>
              <span className='truncate'>{service.name}</span>
            </TableCell>
              <TableCell>
                {(() => {
                  const formatter = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  return formatter.format(service.price)
                })()}
              </TableCell>
              <TableCell>
              <span className='truncate'>{service.description}</span>
            </TableCell>
            <TableCell>{service.ordersCount}</TableCell>
              <TableCell>
                {this.props.hasActions && (
                  <div className='relative flex items-center gap-2'>
                    <Dialog
                      title='Atualizar serviço'
                      trigger={
                        (openDialog) => (
                          <Tooltip content='Atualizar serviço'>
                            <Button
                              size='sm'
                              className='bg-gray-200 text-zinc-800'
                              onClick={openDialog}
                            >
                              <Icon name='edit' size={16} />
                            </Button>
                          </Tooltip>
                        )
                      }
                    >
                      {(closeDialog) => (
                        <ServiceForm
                          service={service}
                          onCancel={closeDialog}
                          onSubmit={async (serviceDto) => {
                            closeDialog()
                            await this.handleUpdateService(serviceDto)
                          }}
                        />
                      )}
                    </Dialog>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
