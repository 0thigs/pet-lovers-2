import { Component } from 'react'

import { CustomersTable } from '@/components/commons/customers-table'
import { ListCustomersByMostSpendingUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '@/database'
import { Customer } from '@world-beauty/core/entities'

type CustomersPageState = {
  page: number
  customers: Customer[]
}

export class CustomersByMostSpendingTable extends Component<any, CustomersPageState> {
  private readonly listCustomersByMostSpending = new ListCustomersByMostSpendingUseCase(
    customersRepository,
  )

  constructor(props: any) {
    super(props)
    this.state = {
      page: 1,
      customers: [],
    }
  }

  async fetchCustomers() {
    const customers = await this.listCustomersByMostSpending.execute()

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
            Top 5 clientes que mais consumiram em valor
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
