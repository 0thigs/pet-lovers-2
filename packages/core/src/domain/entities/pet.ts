import { Entity } from '../abstracts'
import type { PetDto } from '../../dtos'

export type PetProps = {
  name: string
  type: string
  breed: string
  gender: string
  customer: {
    id: string
    name?: string
    cpf?: string
  }
}

export class Pet extends Entity<PetProps> {
  static create(dto: PetDto): Pet {
    return new Pet(
      {
        name: dto.name,
        gender: dto.gender,
        type: dto.type,
        breed: dto.breed,
        customer: {
          id: dto.custumer.id,
          name: dto.custumer.name,
          cpf: dto.custumer.cpf,
        },
      },
      dto.id,
    )
  }

  update(dto: PetDto): Pet {
    return Pet.create({ ...this.props, ...dto })
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get type(): string {
    return this.props.type
  }

  public set type(type: string) {
    this.props.type = type
  }

  public get breed(): string {
    return this.props.breed
  }

  public set breed(breed: string) {
    this.props.breed = breed
  }

  public get gender(): string {
    return this.props.gender
  }

  public set gender(gender: string) {
    this.props.gender = gender
  }

  public get customer(): { id: string; name?: string; cpf?: string } {
    return this.props.customer
  }

  public get dto(): PetDto {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      breed: this.breed,
      gender: this.gender,
      custumer: this.customer,
    }
  }
}
