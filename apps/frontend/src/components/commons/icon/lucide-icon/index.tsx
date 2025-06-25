import { Component } from 'react'
import { ICONS } from './icons'
import type { IconProps } from '../types'

export class LucideIcon extends Component<IconProps> {
  render() {
    const Icon = ICONS[this.props.name]
    return <Icon className={this.props.className} size={this.props.size ?? 24} />
  }
}
