import { randomUUID } from 'crypto'
import { UniqueEntityId } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }
    if (entity.id === this.id) {
      return true
    }

    return false
  }
}
