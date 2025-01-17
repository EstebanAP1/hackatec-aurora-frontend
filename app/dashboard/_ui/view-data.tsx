'use client'

import { getDiscussionBySuicidal } from '@/app/lib/data'
import { Discussion, Suicidal } from '@/app/lib/definitions'
import { UserIcon } from '@/app/ui/icons'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ViewData({
  data,
  closeData
}: {
  data: Suicidal
  closeData: () => void
}) {
  const [discussions, setDiscussions] = useState([] as Discussion[])
  const { username, email, phoneNumber, risk } = data

  useEffect(() => {
    const fetchDiscussions = async () => {
      const response = await getDiscussionBySuicidal(data.id)
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setDiscussions(response.data)
    }

    fetchDiscussions()
  }, [data.id])

  useEffect(() => {
    const escapeHideModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeData()
    }
    document.addEventListener('keydown', escapeHideModal)

    return () => {
      document.removeEventListener('keydown', escapeHideModal)
    }
  }, [closeData])

  return (
    <div
      className={clsx(
        'absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center overflow-hidden',
        !data && 'pointer-events-none'
      )}>
      {data && (
        <div
          className='fixed left-0 top-0 h-dvh w-dvw overflow-hidden after:absolute after:top-0 after:z-30 after:h-full after:w-full after:bg-negro/30'
          onClick={closeData}></div>
      )}
      <section className='bottom-0 z-30 flex h-[90%] w-[70%] flex-col rounded bg-blanco text-negro transition-all duration-200'>
        <header className='flex w-full items-center justify-between px-5 py-2'>
          <h3 className='text-xl font-semibold'>Datos</h3>
          <button onClick={closeData}>
            <XMarkIcon className='size-5' />
          </button>
        </header>
        <main className='flex grow flex-col gap-5 overflow-y-auto px-10 py-4'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
              <h4 className='flex items-center justify-center gap-1 text-2xl font-bold'>
                <UserIcon className='size-8' />
                {username}
              </h4>
              <span className='font-medium'>Riesgo {risk}</span>
            </div>
            <div className='flex flex-col items-end justify-center'>
              <p className='font-medium'>{email}</p>
              <p className='font-medium'>{phoneNumber}</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 px-10 py-2'>
            {discussions.map((discussion, index) => {
              1
              return (
                <div key={index}>
                  <h5 className='font-semibold'>{discussion.title}</h5>
                  <p>{discussion.content}</p>
                </div>
              )
            })}
          </div>
        </main>
      </section>
    </div>
  )
}
