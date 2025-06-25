export type PetDto = {
  id?: string
  name: string
  type: string
  breed: string
  gender: string
  custumer: {
    id: string
    name?: string
    cpf?: string
  }
}
