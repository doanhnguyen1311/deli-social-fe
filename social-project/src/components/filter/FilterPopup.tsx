import { FilterRow, PropsChangeFilterRow } from '@/components/types'
import clsx from 'clsx'
import { KeyboardEvent } from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import FormControlFilter from './FormControlFilter'

interface Props {
  rows: FilterRow[]
  dataFilter: {[key: string]: any}
  handleChangeFilter?: (info: PropsChangeFilterRow) => void
  dataOption: {[key: string]: any}
  onResetFilter: () => void
  handleReloadApi: () => void
  onClose?: () => void
  className?: string
}
export function FilterPopup({
  rows,
  dataFilter,
  dataOption: optionsFromApi,
  handleChangeFilter = () => {},
  handleReloadApi,
  onResetFilter,
  onClose,
}: Props) {
  function handlePressKey(e: KeyboardEvent<any>) {
    if (e.key === 'Enter') {
      handleReloadApi()
    }
  }

  return (
    <Modal title='Filter Options' onClose={() => onClose} className='w-1000px'>
      <form className='p-30px flex-grow-1 overflow-auto'>
        <div className='row g-16px'>
          {rows.map((row) => {
            const {key, className} = row

            return (
              <div key={key} className={clsx([className || 'col-12'])}>
                <div className='d-flex flex-column gap-10px'>
                  <FormControlFilter
                    row={row}
                    onChange={handleChangeFilter}
                    onKeyDown={handlePressKey}
                    optionsFromApi={optionsFromApi[key]}
                    dataFilter={dataFilter}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </form>

      {/* Action */}
      <div className='d-flex justify-content-end p-30px gap-8px border-top border-gray-200'>
        <Button className='btn btn-lg btn-light btn-active-light-primary' onClick={onResetFilter}>
          Reset
        </Button>

        <Button type='submit' onClick={handleReloadApi}>
          Apply
        </Button>
      </div>
    </Modal>
  )
}
