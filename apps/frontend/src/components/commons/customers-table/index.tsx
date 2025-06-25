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

import type { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'
import { OrderForm } from './order-form'
import type { Item } from '@world-beauty/core/abstracts'
import { OrdersTable } from './orders-table'

type CustomersTableProps = {
  customers: Customer[]
  page: number
  pagesCount: number
  hasActions: boolean
  selectedCustomersIds?: string[]
  isLoading?: boolean
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (customerDto: CustomerDto) => void
  onCustomersSelectionChange?: (customersIds: string[]) => void
  onCustomerOrderItems?: (items: Item[], customerId: string) => void
}

export class CustomersTable extends Component<CustomersTableProps> {
  async handleCustomersSelectionChange(customersSelection: Selection) {
    let selectedCustomersIds: string[] = []

    if (customersSelection === 'all') {
      selectedCustomersIds = this.props.customers.map((customer) => customer.id)
    } else {
      selectedCustomersIds = Array.from(customersSelection).map(String)
    }

    if (this.props.onCustomersSelectionChange)
      this.props.onCustomersSelectionChange(selectedCustomersIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdateCustomer(customerDto: CustomerDto) {
    if (this.props.onUpdateCustomer) this.props.onUpdateCustomer(customerDto)
  }

  render() {
    return (
      <div className='w-full'>
        <Table
          aria-label='Tabela de clientes'
          key={this.props.pagesCount}
          color='default'
          selectionMode={this.props.hasActions ? 'multiple' : 'none'}
          selectedKeys={this.props.selectedCustomersIds}
          onSelectionChange={(selection) =>
            this.handleCustomersSelectionChange(selection)
          }
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
            <TableColumn>CPF</TableColumn>
            <TableColumn>Gênero</TableColumn>
            <TableColumn>Nome social</TableColumn>
            <TableColumn>Telefones</TableColumn>
            <TableColumn>RG's</TableColumn>
            <TableColumn>Total consumido</TableColumn>
            <TableColumn>Total gasto</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody
            isLoading={this.props.isLoading}
            loadingContent={<Spinner />}
            emptyContent='Nenhum cliente cadastrado'
            items={this.props.customers}
          >
            {(customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <span className='truncate'>{customer.cpf.format}</span>
                </TableCell>
                <TableCell>
                  {customer.gender === 'male' ? 'masculino' : 'feminino'}
                </TableCell>
                <TableCell>
                  {customer.socialName ? customer.socialName : '----'}
                </TableCell>
                <TableCell>
                  <span className='truncate'>{customer.phonesList}</span>
                </TableCell>
                <TableCell>
                  <span className='truncate'>{customer.rgsList}</span>
                </TableCell>
                <TableCell>{customer.consumption}</TableCell>
                <TableCell>
                  {(() => {
                    const formatter = new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    return formatter.format(customer.spending)
                  })()}
                </TableCell>
                <TableCell>
                  {this.props.hasActions && (
                    <div className='relative flex items-center gap-2'>
                      <Dialog
                        title={`Atualizar cliente ${customer.name}`}
                        trigger={(openDialog) => (
                          <Tooltip content='Atualizar cliente'>
                            <Button
                              size='sm'
                              className='bg-gray-200 text-zinc-800'
                              onClick={openDialog}
                            >
                              <Icon name='edit' size={16} />
                            </Button>
                          </Tooltip>
                        )}
                      >
                        {(closeDialog) => (
                          <CustomerForm
                            customer={customer}
                            onCancel={closeDialog}
                            onSubmit={async (customerDto) => {
                              closeDialog()
                              await this.handleUpdateCustomer(customerDto)
                            }}
                          />
                        )}
                      </Dialog>
                      <Dialog
                        title={`Fazer pedido para o cliente ${customer.name}`}
                        isLarge
                        trigger={(openDialog) => (
                          <Tooltip
                            content={`Fazer pedido para o cliente ${customer.name}`}
                          >
                            <Button
                              size='sm'
                              className='bg-gray-200 text-zinc-800'
                              onClick={openDialog}
                            >
                              <Icon name='order' size={16} />
                            </Button>
                          </Tooltip>
                        )}
                      >
                        {(closeDialog) => (
                          <OrderForm
                            customerId={customer.id}
                            pets={customer.pets}
                            onCancel={closeDialog}
                            onOrderItems={(items) => {
                              closeDialog()
                              if (this.props.onCustomerOrderItems)
                                this.props.onCustomerOrderItems(items, customer.id)
                            }}
                          />
                        )}
                      </Dialog>
                      <Dialog
                        title={`Produtos e serviços consumidos por ${customer.name}`}
                        isLarge
                        trigger={(openDialog) => (
                          <Tooltip
                            content={`Produtos e serviços consumidos por ${customer.name}`}
                          >
                            <Button
                              size='sm'
                              className='bg-gray-200 text-zinc-800'
                              onClick={openDialog}
                            >
                              <Icon name='orders' size={16} />
                            </Button>
                          </Tooltip>
                        )}
                      >
                        {() => <OrdersTable customerId={customer.id} />}
                      </Dialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}
