import { Component } from 'react'

import { ListProductsByMostComsumptionAndPetTypeUseCase } from '@world-beauty/core/use-cases'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type { PetType } from '@world-beauty/core/enums'

import { productsRepository } from '@/database'
import { ProductsTable } from '@/components/commons/products-table'

type Props = {
  selectedPetType: PetType
}

type State = {
  products: Product[]
  productsPage: number
  productsPagesCount: number
}

export class MostConsumedProductsTableByPetType extends Component<Props, State> {
  private readonly useCase = new ListProductsByMostComsumptionAndPetTypeUseCase(
    productsRepository,
  )

  constructor(props: Props) {
    super(props)
    this.state = {
      products: [],
      productsPage: 1,
      productsPagesCount: 0,
    }
  }

  async fetchProducts(page: number, petType: PetType) {
    const { items, itemsCount } = await this.useCase.execute(page, petType)

    this.setState({
      products: items.map(Product.create),
      productsPage: page,
      productsPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleProductsPageChange(page: number) {
    await this.fetchProducts(page, this.props.selectedPetType)
  }

  async componentDidMount() {
    await this.fetchProducts(1, this.props.selectedPetType)
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedPetType !== this.props.selectedPetType) {
      await this.fetchProducts(1, this.props.selectedPetType)
    }
  }

  render() {
    return (
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Produtos mais consumidos por pet's do tipo{' '}
          {this.props.selectedPetType.toLocaleLowerCase()}
        </h2>
        <ProductsTable
          hasActions={false}
          hasSelection={false}
          products={this.state.products}
          page={this.state.productsPage}
          pagesCount={this.state.productsPagesCount}
          onPageChange={(page) => this.handleProductsPageChange(page)}
        />
      </div>
    )
  }
}
