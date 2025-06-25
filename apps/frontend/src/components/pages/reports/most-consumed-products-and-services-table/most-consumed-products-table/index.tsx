import { Component } from 'react'

import { ListMostConsumedProductsUseCase } from '@world-beauty/core/use-cases'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

import { productsRepository } from '@/database'
import { ProductsTable } from '@/components/commons/products-table'

type ProductsPageState = {
  products: Product[]
  page: number
  pagesCount: number
  selectedProductsIds: string[]
}

export class MostConsumedProductsTable extends Component<any, ProductsPageState> {
  private readonly listMostConsumedProducts = new ListMostConsumedProductsUseCase(
    productsRepository,
  )

  constructor(props: any) {
    super(props)
    this.state = {
      products: [],
      page: 1,
      pagesCount: 0,
      selectedProductsIds: [],
    }
  }

  async fetchProducts(page: number) {
    const { items, itemsCount } = await this.listMostConsumedProducts.execute(page)

    this.setState({
      products: items.map(Product.create),
      page,
      pagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handlePageChange(page: number) {
    await this.fetchProducts(page)
  }
  async componentDidMount() {
    await this.fetchProducts(this.state.page)
  }

  render() {
    return (
      <ProductsTable
        hasSelection={false}
        hasActions={false}
        products={this.state.products}
        page={this.state.page}
        pagesCount={this.state.pagesCount}
        onPageChange={(page) => this.handlePageChange(page)}
      />
    )
  }
}
