import { Button, Divider, Input, Radio, RadioGroup } from '@nextui-org/react'
import { Component, type FormEvent } from 'react'

import type { CustomerDto, DocumentDto, PhoneDto } from '@world-beauty/core/dtos'
import type { Customer } from '@world-beauty/core/entities'

import { Icon } from '@/components/commons/icon'
import { Datetime } from '@world-beauty/core/libs'

type RegisterCustomerFormProps = {
  customer?: Customer
  onSubmit: (customer: CustomerDto) => void
  onCancel: () => void
}

type RegisterCustomerFormState = {
  rgFields: number[]
  phoneFields: number[]
}

export class CustomerForm extends Component<
  RegisterCustomerFormProps,
  RegisterCustomerFormState
> {
  constructor(props: RegisterCustomerFormProps) {
    super(props)
    this.state = {
      rgFields: props.customer?.rgs ? props.customer?.rgs.map((_, index) => index) : [0],
      phoneFields: props.customer?.phones ? props.customer?.phones.map((_, index) => index) : [0],
    }
  }

  componentDidMount(): void {
    this.state = {
      rgFields: this.props.customer?.rgs ? this.props.customer?.rgs.map((_, index) => index) : [0],
      phoneFields: this.props.customer?.phones ? this.props.customer?.phones.map((_, index) => index) : [0],
    }
  }

  handleAppendRgFieldButtonClick() {
    const lastField =  this.state.rgFields.at(-1)
    this.setState({ ...this.state, rgFields: [...this.state.rgFields, lastField ? lastField + 1 : 1] })
  }

  handlePopRgFieldButtonClick(fieldId: number) {
    if (this.state.rgFields.length > 1) {
      this.setState({ ...this.state, rgFields: this.state.rgFields.filter(field => field !== fieldId) })
    }
  }

  handleAppendPhoneFieldButtonClick() {
    const lastField =  this.state.phoneFields.at(-1)
    console.log(lastField)
    this.setState({ ...this.state, phoneFields: [...this.state.phoneFields, lastField ? lastField + 1 : 1] })
  }

  handlePopPhoneFieldButtonClick(fieldId: number) {
    if (this.state.phoneFields.length > 1) {
      this.setState({ ...this.state, phoneFields: this.state.phoneFields.filter(field => field !== fieldId) })
    }
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(event.target)

    const name = formData.get('name')
    const cpfValue = formData.get('cpf-value')
    const cpfIssueDate = new Date(String(formData.get('cpf-issue-date')))
    const socialName = formData.get('social-name')
    const gender = formData.get('gender')

    const cpf = {
      value: String(cpfValue),
      issueDate: new Datetime(cpfIssueDate).addDays(1),
    }

    const rgNames = formData.getAll('rg-name[]')
    const rgIssueDates = formData.getAll('rg-issue-date[]')

    const phoneCodesArea = formData.getAll('phone-code-area[]')
    const phoneNumbers = formData.getAll('phone-number[]')

    const rgs: DocumentDto[] = []
    for (let index = 0; index < rgNames.length; index++) {
      rgs.push({
        value: String(rgNames[index]),
        issueDate: new Datetime(new Date(String(rgIssueDates[index]))).addDays(1),
      })
    }

    const phones: PhoneDto[] = []
    for (let index = 0; index < phoneCodesArea.length; index++) {
      phones.push({
        codeArea: String(phoneCodesArea[index]),
        number: String(phoneNumbers[index]),
      })
    }

    const customerDto: CustomerDto = {
      gender: String(gender),
      name: String(name),
      socialName: String(socialName),
      cpf,
      phones,
      rgs,
    }

    if (this.props.customer) {
      const updatedCustomer = this.props.customer.update(customerDto)
      this.props.onSubmit(updatedCustomer.dto)
      return
    }

    this.props.onSubmit(customerDto)
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <Input
            autoFocus
            label='Nome'
            name='name'
            defaultValue={this.props.customer?.name}
            variant='bordered'
            required
          />
          <Input
            label='Nome social (opcional)'
            name='social-name'
            defaultValue={this.props.customer?.socialName ?? ''}
            variant='bordered'
          />
        </div>
        <Divider />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <Input
            name='cpf-value'
            label='CPF'
            variant='bordered'
            defaultValue={this.props.customer?.cpf.value}
            required
          />
          <Input
            name='cpf-issue-date'
            type='date'
            label='Data de emissão'
            variant='bordered'
            defaultValue={this.props.customer?.cpf.issueDateAsString}
            required
          />
        </div>
        <Divider />
        <div>
          <div className='flex items-center justify-between'>
            <Button
              size='sm'
              variant='bordered'
              className='text-zinc-500'
              onClick={() => this.handleAppendRgFieldButtonClick()}
            >
              Adicionar RG
              <Icon name='add' size={16} />
            </Button>
          </div>
          <div className='mt-1 space-y-1'>
            {this.state.rgFields.map((id) => (
              <div
                key={String(id)}
                className='grid grid-cols-1 md:grid-cols-[1fr_1fr_0.25fr] gap-2'
              >
                <Input
                  label='RG'
                  name='rg-name[]'
                  variant='bordered'
                  radius='sm'
                  defaultValue={this.props.customer?.rgs[id]?.value}
                  required
                />
                <Input
                  type='date'
                  name='rg-issue-date[]'
                  label='Data de emissão'
                  variant='bordered'
                  radius='sm'
                  defaultValue={this.props.customer?.rgs[id]?.issueDateAsString}
                  required
                />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='md:h-full w-full text-red-600'
                  onClick={() => this.handlePopRgFieldButtonClick(id)}
                >
                  <Icon name='delete' size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div>
          <div className='flex items-center justify-between'>
            <Button size='sm' radius='sm' variant='bordered' className='text-zinc-500' onClick={() => this.handleAppendPhoneFieldButtonClick()}>
                Adicionar telefone
              <Icon name='add' size={16} />
            </Button>
          </div>
          <div className='mt-1 space-y-1'>
            {this.state.phoneFields.map((id) => (
              <div
                key={String(id)}
                className='grid grid-cols-1 md:grid-cols-[1fr_1fr_0.25fr] gap-2'
              >
                <Input
                  label='DDD'
                  name='phone-code-area[]'
                  variant='bordered'
                  defaultValue={this.props.customer?.phones[id]?.codeArea}
                  required
                />
                <Input
                  label='Número'
                  name='phone-number[]'
                  variant='bordered'
                  defaultValue={this.props.customer?.phones[id]?.number}
                  required
                />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='md:h-full w-full text-red-600'
                  onClick={() => this.handlePopPhoneFieldButtonClick(id)}
                >
                  <Icon name='delete' size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div className='flex items-center gap-2'>
          <Button type='submit' color='primary' className='mt-3'>
            Enviar
          </Button>
          <Button color='danger' onClick={() => this.props.onCancel()} className='mt-3'>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }
}
