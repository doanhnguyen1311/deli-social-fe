

import { KTIcon } from '@/_metronic/helpers'
import iconClose from '@/components/images/icon.png'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Checkbox } from '../checkbox'
import './style.scss'
import { Input } from '../input'
import clsx from 'clsx'

interface Option {
  [key: string]: any
}

interface MultiSelectProps {
  options: Option[]
  keyValueOption: string
  keyLabelOption: string
  listSelected: Option[]
  setListSelected: (selected: Option[]) => void
  sortBy?: string
  className?: string
  label?: string
  placeholder?: string
  isSearch?: boolean
  searchValue?: string
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  keyValueOption,
  keyLabelOption,
  listSelected = [],
  setListSelected,
  sortBy,
  className = '',
  label = '',
  placeholder = '',
  isSearch = false,
  searchValue = '',
  handleInputChange,
  handleBlur
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const safeSelected = Array.isArray(listSelected) ? listSelected : []

  const sortedOptions = sortBy
    ? [...options].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCheckboxChange = (id: any) => {
    if (safeSelected.some((item) => item[keyValueOption] === id)) {
      setListSelected(safeSelected.filter((item) => item[keyValueOption] !== id))
    } else {
      const selectedOption = options.find((option) => option[keyValueOption] === id)
      if (selectedOption) {
        setListSelected([...safeSelected, selectedOption])
      }
    }
  }

  const renderSelectedLabels = () => {
    return (
      <div className='d-flex flex-row gap-8px'>
        {label &&(
          <>
            <div className='d-flex align-self-center black-brand-300 fs-13'>{label}</div>
            <div className='d-flex align-self-center black-brand-300 fs-13'>|</div>
          </>
        )}
        <div className="d-flex flex-wrap">
          {listSelected.map((item) => (
            <div key={item[keyValueOption]} className='multi-select-selected-item'>
              <span>{item[keyLabelOption]}</span>
              <img
                src={iconClose}
                alt=''
                className='w-16px h-16px cursor-pointer'
                onClick={e => {
                  e.stopPropagation();
                  handleCheckboxChange(item[keyValueOption]);
                }}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={clsx("multi-select-container", className)} ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx('multi-select-selected d-flex align-items-center justify-content-between', isOpen && "active")}
        style={{ borderRadius: '8px', backgroundColor: '#fff', minHeight: '50px' }}
      >
        <div className='d-flex align-self-center medium-gray-500 fs-14'>
          {listSelected.length ? renderSelectedLabels() : (label || placeholder)}
        </div>
        <KTIcon iconName='down' className='fs-14' />
      </div>

      {isOpen && (
        <div className={clsx('multi-select-dropdown', isOpen && "active")}>
          {isSearch && (
            <div className="input-search w-100 p-12px bg-white position-sticky top-0" style={{ zIndex: 1000 }}>
              <Input
                classInputWrap="rounded-8px"
                classShared='position-relative w-100'
                name="search"
                placeholder="Search"
                value={searchValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>
          )}
          <div className='d-flex flex-column gap-8px p-12px overflow-auto w-100'>
            {sortedOptions.map((option, index) => (
              <div className='' key={index}>
                <label className='d-flex flex-row gap-12px p-8px cursor-pointer text-hover-primary'>
                  <Checkbox
                    name='category'
                    className='checkbox-cate label-category'
                    checked={safeSelected && safeSelected.some(
                      (item) => item[keyValueOption] === option[keyValueOption]
                    )}
                    onChange={e => {
                      e.stopPropagation();
                      handleCheckboxChange(option[keyValueOption]);
                    }}
                  />
                  {option[keyLabelOption]}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelect
