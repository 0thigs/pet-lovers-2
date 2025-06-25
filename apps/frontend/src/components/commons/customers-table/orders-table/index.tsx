import { Component } from 'react'

import { Tab, Tabs } from '@nextui-org/react'

import type { Product, Service } from '@world-beauty/core/entities'
import {
  ListCustomerOrderedProductsUseCase,
  ListCustomerOrderedservicesUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'

import { productsRepository, servicesRepository } from '@/database'
import { ProductsTable } from '../../products-table'
import { ServicesTable } from '../../services-table'

type OrderFormProps = {
  customerId: string
}

type OrderFormState = {
  products: Product[]
  productsPage: number
  productsPagesCount: number
  selectedProductsIds: string[]
  services: Service[]
  servicesPage: number
  servicesPagesCount: number
  selectedServicesIds: string[]
}

export class OrdersTable extends Component<OrderFormProps, OrderFormState> {
  private readonly listProductsUseCase = new ListCustomerOrderedProductsUseCase(
    productsRepository,
  )
  private readonly listServicesUseCase = new ListCustomerOrderedservicesUseCase(
    servicesRepository,
  )

  constructor(props: OrderFormProps) {
    super(props)
    this.state = {
      products: [],
      productsPage: 0,
      productsPagesCount: 0,
      selectedProductsIds: [],
      services: [],
      servicesPage: 0,
      servicesPagesCount: 0,
      selectedServicesIds: [],
    }
  }

  async fetchProducts(page: number) {
    const response = await this.listProductsUseCase.execute(this.props.customerId, page)
    this.setState({
      products: response.items,
      productsPagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      productsPage: page,
    })
  }

  async fetchServices(page: number) {
    const response = await this.listServicesUseCase.execute(this.props.customerId, page)
    this.setState({
      services: response.items,
      servicesPagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      servicesPage: page,
    })
  }

  async handleProductsPageChange(page: number) {
    await this.fetchProducts(page)
  }

  async handleServicesPageChange(page: number) {
    await this.fetchServices(page)
  }

  handleProductsSelectionChange(selectedProductsIds: string[]) {
    this.setState({
      selectedProductsIds,
    })
  }

  handleServicesSelectionChange(selectedServicesIds: string[]) {
    this.setState({
      selectedServicesIds,
    })
  }

  async componentDidMount() {
    await Promise.all([this.fetchProducts(1), this.fetchServices(1)])
  }

  render() {
    return (
      <>
        <Tabs aria-label='Tabelas' className='mt-3 w-full'>
          <Tab title='Produtos' className='w-full'>
            <ProductsTable
              hasActions={false}
              hasSelection={false}
              products={this.state.products}
              page={this.state.productsPage}
              pagesCount={this.state.productsPagesCount}
              selectedProductsIds={this.state.selectedProductsIds}
              onPageChange={(page) => this.handleProductsPageChange(page)}
              onProductsSelectionChange={(productsIds) =>
                this.handleProductsSelectionChange(productsIds)
              }
            />
          </Tab>
          <Tab title='Serviços' className='w-full'>
            <ServicesTable
              hasActions={false}
              hasSelection={false}
              services={this.state.services}
              page={this.state.servicesPage}
              pagesCount={this.state.servicesPagesCount}
              onPageChange={(page) => this.handleServicesPageChange(page)}
              selectedServicesIds={this.state.selectedServicesIds}
              onServicesSelectionChange={(servicesIds) =>
                this.handleServicesSelectionChange(servicesIds)
              }
            />
          </Tab>
        </Tabs>
      </>
    )
  }
}
