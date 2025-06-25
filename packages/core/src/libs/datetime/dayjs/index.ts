import dayjs from 'dayjs'
import type { DateFormat } from '../types'
import type { IDatetime } from '../../../interfaces/libs'

export class DayjsDatetime implements IDatetime {
  private readonly date: dayjs.Dayjs

  constructor(date: Date) {
    this.date = dayjs(date)
  }

  format(dateFormat: DateFormat) {
    return this.date.format(dateFormat)
  }

  addDays(daysCount: number): Date {
    return this.date.add(daysCount, 'days').toDate()
  }
}
