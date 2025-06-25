import { Component } from 'react'

import { MostConsumedProductsTable } from './most-consumed-products-table'
import { MostConsumedServicesTable } from './most-consumed-services-table'

export class MostConsumedProductsAndServicesTable extends Component {
  render() {
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Produtos mais consumidos
          </h2>
          <MostConsumedProductsTable />
        </div>
        <div className='mt-6'>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Serviços mais consumidos
          </h2>
          <MostConsumedServicesTable />
        </div>
      </div>
    )
  }
}
