import type { PhoneDto } from '../../dtos'

export class Phone {
  private constructor(
    readonly codeArea: string,
    readonly number: string,
  ) {}

  static create(dto: PhoneDto): Phone {
    return new Phone(dto.codeArea, dto.number)
  }

  get value(): string {
    return `+${this.codeArea} ${this.number}`
  }
}
