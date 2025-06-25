import { Component } from 'react'

import { CustomersTable } from '@/components/commons/customers-table'
import { ListCustomersByMostConsumptionUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '@/database'
import { Customer } from '@world-beauty/core/entities'

type CustomersPageState = {
  page: number
  customers: Customer[]
}

export class CustomersByMostConsumptionTable extends Component<any, CustomersPageState> {
  private readonly listCustomersByMostConsumption =
    new ListCustomersByMostConsumptionUseCase(customersRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      page: 1,
      customers: [],
    }
  }

  async fetchCustomers() {
    const customers = await this.listCustomersByMostConsumption.execute()

    this.setState({
      customers: customers.map(Customer.create),
    })
  }

  handleCustomersPageChange(page: number) {
    this.setState({ page })
  }

  async componentDidMount() {
    await this.fetchCustomers()
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Top 10 clientes que mais consumiram produtos ou serviços (em quantidade)
          </h2>
          <CustomersTable
            hasActions={false}
            customers={this.state.customers}
            page={this.state.page}
            pagesCount={0}
            onPageChange={(page) => this.handleCustomersPageChange(page)}
          />
        </div>
      </div>
    )
  }
}
