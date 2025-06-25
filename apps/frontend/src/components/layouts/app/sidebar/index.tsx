import { Component } from 'react'
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'

import { NavMenu } from '../navbar'

type SidebarState = {
  isDrawerOpen: boolean
}

export class Sidebar extends Component<any, SidebarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isDrawerOpen: false,
    }
  }

  handleMenuClick() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }

  render() {
    return (
      <div className='fixed top-0 left-0 w-48 md:border-1 p-6 md:bg-zinc-50 h-screen'>
        <div className='bg-zinc-800 rounded-md'>
          <h1 className='text-zinc-50 text-center px-3 py-2 font-bold'>Pet Lovers 🐶</h1>
        </div>
        <div className='mt-3'>
          <NavMenu />
        </div>
      </div>
    )
  }
}
