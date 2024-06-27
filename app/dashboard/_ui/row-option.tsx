'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { updateSuicidalStatus } from '@/app/lib/actions'
import { capitalizeFirstLetter } from '@/app/lib/utils'
import { toast } from 'sonner'

const options = ['DISPONIBLE', 'NO DISPONIBLE', 'CONTACTADO']

export default function RowOption({
  id,
  oldStatus,
  changeSuicidalStatus
}: {
  id: number
  oldStatus: string
  changeSuicidalStatus: (id: number, status: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const customSelectRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        customSelectRef.current &&
        !customSelectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setIsOpen])

  const handleOptionClick = async (status: string) => {
    setIsOpen(false)
    changeSuicidalStatus(id, status)
    const response = await updateSuicidalStatus(id.toString(), status)

    if (!response.success) {
      changeSuicidalStatus(id, oldStatus)
      toast.error(response.message)
      return
    }
  }
  return (
    <div className='relative select-none' ref={customSelectRef}>
      <button
        onClick={handleToggle}
        className='flex items-center justify-center'>
        <EllipsisHorizontalIcon className='size-5' />
      </button>
      <div
        className={clsx(
          'absolute left-[130%] top-0 z-10 w-fit flex-col rounded-lg bg-negro transition-all',
          isOpen
            ? 'visible -translate-y-px opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        )}>
        {options.map((option, index) => {
          return (
            <button
              onClick={() => handleOptionClick(option)}
              aria-label={`Change status to ${option}`}
              key={index}
              className='w-full cursor-pointer text-nowrap rounded-lg p-2 pr-10 text-start text-sm text-blanco transition hover:bg-blanco/10'>
              {capitalizeFirstLetter(option)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
