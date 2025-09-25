import moment, { MomentInput } from 'moment'
import { TypeDateFormat } from '../types'

export function getDaysOfCurrentDate(): number {
  return new Date().getDate()
}

export function formatDate(date: MomentInput, typeFormat: TypeDateFormat = 'YYYY-MM-DD'): string {
  return moment(date).isValid() ? moment(date).format(typeFormat) : ''
}

export function createNewDate(options?: {
  defaultDate?: Date
  isMidNight?: boolean
  toISOString?: boolean
}): any {
  const { isMidNight = false, defaultDate = new Date() } = options || {}

  const m = moment(defaultDate).utcOffset(0)

  if (isMidNight) {
    m.set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
  } else {
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  }

  m.toISOString()
  m.format()

  return m
}
