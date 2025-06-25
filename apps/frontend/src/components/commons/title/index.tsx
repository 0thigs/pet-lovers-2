import { Component } from 'react'

type PageTitleProps = {
  children: string
}

export class PageTitle extends Component<PageTitleProps> {
  render() {
    return (
      <h1 className='pb-4 text-2xl text-zinc-800 font-semibold border-b border-zinc-300'>
        {this.props.children}
      </h1>
    )
  }
}
