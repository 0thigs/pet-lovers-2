import { Component } from 'react'
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  type Selection,
} from '@nextui-org/react'

import type { Pet } from '@world-beauty/core/entities'
import type { PetDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { PetForm } from './pet-form'

type PetsTableProps = {
  pets: Pet[]
  page: number
  pagesCount: number
  hasActions: boolean
  hasSelection: boolean
  isLoading?: boolean
  selectedPetsIds?: string[]
  onPageChange?: (page: number) => void
  onUpdatePet?: (petDto: PetDto) => void
  onPetsSelectionChange?: (petsIds: string[]) => void
}

export class PetsTable extends Component<PetsTableProps> {
  async handlePetsSelectionChange(petsSelection: Selection) {
    let selectedPetsIds: string[] = []

    if (petsSelection === 'all') {
      selectedPetsIds = this.props.pets.map((pet) => pet.id)
    } else {
      selectedPetsIds = Array.from(petsSelection).map(String)
    }

    if (this.props.onPetsSelectionChange)
      this.props.onPetsSelectionChange(selectedPetsIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdatePet(petDto: PetDto) {
    if (this.props.onUpdatePet) this.props.onUpdatePet(petDto)
  }

  render() {
    return (
      <Table
        key={this.props.pagesCount}
        color='default'
        selectionMode={this.props.hasSelection ? 'multiple' : 'none'}
        selectedKeys={this.props.selectedPetsIds}
        aria-label="Tabela de pet's"
        onSelectionChange={(selection) => this.handlePetsSelectionChange(selection)}
        bottomContent={
          this.props.pagesCount > 1 && (
            <Pagination
              color='primary'
              total={this.props.pagesCount}
              initialPage={this.props.page}
              onChange={(page) => this.handlePageChange(page)}
            />
          )
        }
        className='w-full'
        checkboxesProps={{
          classNames: {
            wrapper: 'after:bg-foreground after:text-background text-background',
          },
        }}
      >
        <TableHeader>
          <TableColumn>Nome</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Raça</TableColumn>
          <TableColumn>Gênero</TableColumn>
          <TableColumn>Nome do cliente</TableColumn>
          <TableColumn>CPF do cliente</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={this.props.isLoading}
          loadingContent={<Spinner />}
          emptyContent='Nenhum pet cadastrado'
          items={this.props.pets}
        >
          {(pet) => (
            <TableRow key={pet.id}>
              <TableCell>
                <span className='truncate'>{pet.name}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>{pet.type}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>{pet.breed}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                </span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {pet.customer.name}
                </span>
              </TableCell>
              <TableCell>
                <span className='truncate'>
                  {`${pet.customer.cpf?.slice(0, 3)}.${pet.customer.cpf?.slice(3, 6)}.${pet.customer.cpf?.slice(6, 9)}-${pet.customer.cpf?.slice(9)}`}
                </span>
              </TableCell>
              <TableCell>
                {this.props.hasActions && (
                  <div className='relative flex items-center gap-2'>
                    <Dialog
                      title='Atualizar pet'
                      trigger={(openDialog) => (
                        <Tooltip content='Atualizar pet'>
                          <Button
                            size='sm'
                            className='bg-gray-200 text-zinc-800'
                            onClick={openDialog}
                          >
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                      )}
                    >
                      {(closeDialog) => (
                        <PetForm
                          pet={pet}
                          onCancel={closeDialog}
                          onSubmit={async (petDto) => {
                            closeDialog()
                            await this.handleUpdatePet(petDto)
                          }}
                        />
                      )}
                    </Dialog>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
