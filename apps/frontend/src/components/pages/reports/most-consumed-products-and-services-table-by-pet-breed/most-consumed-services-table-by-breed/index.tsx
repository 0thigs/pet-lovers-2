import { Component } from 'react'

import { ListProductsByMostComsumptionAndPetBreedUseCase } from '@world-beauty/core/use-cases'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

import { productsRepository } from '@/database'
import { ProductsTable } from '@/components/commons/products-table'

type Props = {
  selectedPetBreed: string
}

type State = {
  products: Product[]
  productsPage: number
  productsPagesCount: number
}

export class MostConsumedServicesTableByPetBreed extends Component<Props, State> {
  private readonly useCase = new ListProductsByMostComsumptionAndPetBreedUseCase(
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

  async fetchProducts(page: number, petBreed: string) {
    const { items, itemsCount } = await this.useCase.execute(page, petBreed)

    this.setState({
      products: items.map(Product.create),
      productsPage: page,
      productsPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleProductsPageChange(page: number) {
    await this.fetchProducts(page, this.props.selectedPetBreed)
  }

  async componentDidMount() {
    await this.fetchProducts(1, this.props.selectedPetBreed)
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedPetBreed !== this.props.selectedPetBreed) {
      await this.fetchProducts(1, this.props.selectedPetBreed)
    }
  }

  render() {
    return (
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Produtos mais consumidos por pet's da raça {this.props.selectedPetBreed}
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
