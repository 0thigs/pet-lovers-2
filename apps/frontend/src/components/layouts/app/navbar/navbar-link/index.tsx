import { Component } from 'react'
import { Link } from '@nextui-org/react'
import type { IconName } from '@/components/commons/icon/types'
import { Icon } from '@/components/commons/icon'

type NavLinkProps = {
  icon: IconName
  title: string
  link: string
  isActive: boolean
}

export class NavbarLink extends Component<NavLinkProps> {
  render() {
    return (
      <Link
        href={this.props.link}
        className={`flex items-center gap-1 w-full px-3 py-2 rounded-md text-md text-zinc-700 font-medium hover:bg-zinc-200 ${this.props.isActive ? 'bg-zinc-200' : ''}`}
      >
        <Icon name={this.props.icon} className='text-zinc-700' size={20} />
        {this.props.title}
      </Link>
    )
  }
}
