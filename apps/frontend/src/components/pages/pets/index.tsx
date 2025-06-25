import { Component } from 'react'
import { Button } from '@nextui-org/react'
import { toast } from 'react-toastify'

import {
  DeletePetsUseCase,
  RegisterPetUseCase,
  UpdatePetUseCase,
  ListPetsUseCase,
} from '@world-beauty/core/use-cases'
import { Pet } from '@world-beauty/core/entities'
import type { PetDto } from '@world-beauty/core/dtos'
import { PAGINATION } from '@world-beauty/core/constants'

import { LocalStoragePetsRepository } from '@/database/localstorage/repositories/local-storage-pets-repository'
import { PageTitle } from '@/components/commons/title'
import { Icon } from '@/components/commons/icon'
import { PetsTable } from '@/components/commons/pets-table'
import { Dialog } from '@/components/commons/dialog'
import { PetForm } from '../../commons/pets-table/pet-form'
import {
  LocalStorageCustomersRepository,
  LocalStorageOrdersRepository,
} from '@/database/localstorage/repositories'

type PetsPageState = {
  pets: Pet[]
  page: number
  pagesCount: number
  selectedPetsIds: string[]
  isFetching: boolean
}

export class PetsPage extends Component<any, PetsPageState> {
  private readonly petsRepository = LocalStoragePetsRepository(
    LocalStorageCustomersRepository(LocalStorageOrdersRepository()),
  )
  private readonly listPetsUseCase = new ListPetsUseCase(this.petsRepository)
  private readonly registerPetUseCase = new RegisterPetUseCase(this.petsRepository)
  private readonly updatePetUseCase = new UpdatePetUseCase(this.petsRepository)
  private readonly deletePetsUseCase = new DeletePetsUseCase(this.petsRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      pets: [],
      page: 1,
      pagesCount: 0,
      selectedPetsIds: [],
      isFetching: true,
    }
  }

  async fetchPets(page: number) {
    const response = await this.listPetsUseCase.execute(page)
    this.setState({
      pets: response.items.map(Pet.create),
      pagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handlePetsSelectionChange(selectedPetsIds: string[]) {
    this.setState({
      selectedPetsIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchPets(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedPetsIds: [] })
    await this.deletePetsUseCase.execute(this.state.selectedPetsIds)
    await this.fetchPets(1)
  }

  async handleRegisterPet(petDto: PetDto) {
    await this.registerPetUseCase.execute(petDto)
    await this.fetchPets(1)
  }

  async handleUpdatePet(petDto: PetDto) {
    await this.updatePetUseCase.execute(petDto)
    await this.fetchPets(1)
  }

  handlePetOrderItems() {
    this.fetchPets(this.state.page)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  async componentDidMount() {
    await this.fetchPets(1)
    this.setState({ isFetching: false })
  }

  render() {
    return (
      <div className='flex flex-col gap-3 pb-24 bg-zinc-50'>
        <PageTitle>Pet's</PageTitle>

        <div className='flex items-center gap-2'>
          <Dialog
            title='Adicionar pet'
            trigger={(openDialog) => (
              <Button
                endContent={<Icon name='add' size={20} />}
                radius='sm'
                onClick={openDialog}
                className='bg-zinc-800 text-zinc-50 w-max'
              >
                Cadastrar pet
              </Button>
            )}
          >
            {(closeDialog) => (
              <PetForm
                onCancel={closeDialog}
                onSubmit={async (petDto) => {
                  closeDialog()
                  await this.handleRegisterPet(petDto)
                }}
              />
            )}
          </Dialog>
          {this.state.selectedPetsIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar pet(s)
            </Button>
          )}
        </div>

        <PetsTable
          hasActions={true}
          hasSelection={true}
          pets={this.state.pets}
          isLoading={this.state.isFetching}
          page={this.state.page}
          pagesCount={this.state.pagesCount}
          selectedPetsIds={this.state.selectedPetsIds}
          onUpdatePet={(petDto: PetDto) => this.handleUpdatePet(petDto)}
          onPageChange={(page) => this.handlePageChange(page)}
          onPetsSelectionChange={(petsIds) => this.handlePetsSelectionChange(petsIds)}
        />
      </div>
    )
  }
}
