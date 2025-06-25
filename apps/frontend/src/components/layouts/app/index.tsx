import { Component } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'

import { Button } from '@nextui-org/react'
import { Icon } from '@/components/commons/icon'
import { Sidebar } from './sidebar'

type AppLayoutState = {
  isDrawerOpen: boolean
}

export class AppLayout extends Component<any, AppLayoutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isDrawerOpen: false,
    }
  }

  closeDrawer() {
    this.setState({ isDrawerOpen: false })
  }

  openDrawer() {
    this.setState({ isDrawerOpen: true })
  }

  handleMenuClick() {
    this.openDrawer()
  }

  render() {
    return (
      <div className='relative flex h-screen'>
        <div className='hidden md:block'>
          <Sidebar />
        </div>
        <div className='absolute top-1 left-1 pl-3 pt-3 md:hidden'>
          <Button
            isIconOnly
            size='sm'
            className='bg-transparent'
            onClick={() => this.handleMenuClick()}
          >
            <Icon name='menu' />
          </Button>
          <Drawer
            direction='left'
            className='bg-zinc-50'
            open={this.state.isDrawerOpen}
            onClose={() => this.closeDrawer()}
          >
            <Sidebar />
          </Drawer>
        </div>
        <main className='w-full h-full pl-6 md:pl-56 md:pr-8 pt-12 md:pt-8 bg-zinc-50'>
          <Outlet />
        </main>
        <ToastContainer />
      </div>
    )
  }
}
