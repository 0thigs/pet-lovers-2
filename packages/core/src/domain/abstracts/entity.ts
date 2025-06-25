import { v4 as generateId } from 'uuid'

export class Entity<Props> {
  readonly id: string
  protected props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this.id = id ?? generateId().slice(0, 4)
  }

  isEqualTo(entity: Entity<Props>): boolean {
    return this.id === entity.id
  }
}
