import { Document } from '../abstracts'
import type { DocumentDto } from '../../dtos'

export class Cpf extends Document {
  static create(dto: DocumentDto): Cpf {
    return new Cpf(dto.value, dto.issueDate)
  }

  get format() {
    if (this.value.length === 11) {
      const formattedRG = `${this.value.slice(0, 3)}.${this.value.slice(3, 6)}.${this.value.slice(6, 9)}-${this.value.slice(9)}`
      return formattedRG
    }

    return this.value
  }

  get dto(): DocumentDto {
    return {
      issueDate:
        this.issueDate instanceof Date ? this.issueDate : new Date(this.issueDate),
      value: this.value,
    }
  }
}