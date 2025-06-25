import type { DocumentDto } from './document-dto'
import type { PetDto } from './pet-dto'
import type { PhoneDto } from './phone-dto'

export type CustomerDto = {
  id?: string
  name: string
  socialName?: string
  gender: string
  cpf: DocumentDto
  rgs: DocumentDto[]
  phones: PhoneDto[]
  pets?: PetDto[]
  consumption?: number
  spending?: number
}
