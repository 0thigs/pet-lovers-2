import { Component } from 'react'

import { NavbarLink } from './navbar-link'

export class NavMenu extends Component {
  render() {
    return (
      <ul className='space-y-2'>
        <li>
          <NavbarLink
            icon='customer'
            link='/'
            title='Clientes'
            isActive={window.location.pathname === '/'}
          />
        </li>
        <li>
          <NavbarLink
            icon='pet'
            link='/pets'
            title="Pet's"
            isActive={window.location.pathname === '/pets'}
          />
        </li>
        <li>
          <NavbarLink
            icon='product'
            link='/products'
            title='Produtos'
            isActive={window.location.pathname === '/products'}
          />
        </li>
        <li>
          <NavbarLink
            icon='service'
            link='/services'
            title='Seviços'
            isActive={window.location.pathname === '/services'}
          />
        </li>
        <li>
          <NavbarLink
            icon='list'
            link='/reports'
            title='Relatórios'
            isActive={window.location.pathname === '/reports'}
          />
        </li>
      </ul>
    )
  }
}
