import { Component } from 'react'
import { Button } from '@nextui-org/react'

import {
  DeleteProductsUseCase,
  ListProductsUseCase,
  RegisterProductUseCase,
  UpdateProductUseCase,
} from '@world-beauty/core/use-cases'
import type { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { productsRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ProductForm } from '../../commons/products-table/product-form'
import { ProductsTable } from '@/components/commons/products-table'

type ProductsPageState = {
  products: Product[]
  page: number
  pagesCount: number
  selectedProductsIds: string[]
}

export class ProductsPage extends Component<any, ProductsPageState> {
  private readonly listProductsUseCase = new ListProductsUseCase(productsRepository)
  private readonly registerProductUseCase = new RegisterProductUseCase(productsRepository)
  private readonly updateProductUseCase = new UpdateProductUseCase(productsRepository)
  private readonly deleteProductsUseCase = new DeleteProductsUseCase(productsRepository)

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
    const response = await this.listProductsUseCase.execute(page)
    this.setState({
      products: response.items,
      pagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  handleProductsSelectionChange(selectedProductsIds: string[]) {
    this.setState({
      selectedProductsIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchProducts(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedProductsIds: [] })
    await this.deleteProductsUseCase.execute(this.state.selectedProductsIds)
    await this.fetchProducts(1)
  }

  async handleUpdateProduct(productDto: ProductDto) {
    await this.updateProductUseCase.execute(productDto)
    await this.fetchProducts(1)
  }

  async handleSubmit(
    productDto: ProductDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await this.registerProductUseCase.execute(productDto)
    } else {
      await this.updateProductUseCase.execute(productDto)
    }
    await this.fetchProducts(1)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchProducts(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3 pb-24 bg-zinc-50'>
        <PageTitle>Produtos</PageTitle>

        <div className='flex items-center gap-2'>
          <Dialog
            title='Adicionar produto'
            trigger={(openDialog) => (
              <Button
                endContent={<Icon name='add' size={20} />}
                radius='sm'
                onClick={openDialog}
                className='bg-zinc-800 text-zinc-50 w-max'
              >
                Cadastrar produto
              </Button>
            )}
          >
            {(closeDialog) => (
              <ProductForm
                onCancel={closeDialog}
                onSubmit={(ProductDto) =>
                  this.handleSubmit(ProductDto, closeDialog, 'register')
                }
              />
            )}
          </Dialog>
          {this.state.selectedProductsIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar produto(s)
            </Button>
          )}
        </div>

        <div className='w-full'>
          <ProductsTable
            hasActions={true}
            hasSelection={true}
            products={this.state.products}
            page={this.state.page}
            pagesCount={this.state.pagesCount}
            selectedProductsIds={this.state.selectedProductsIds}
            onUpdateProduct={(productDto) => this.handleUpdateProduct(productDto)}
            onPageChange={(page) => this.handlePageChange(page)}
            onProductsSelectionChange={(productsIds) =>
              this.handleProductsSelectionChange(productsIds)
            }
          />
        </div>
      </div>
    )
  }
}
