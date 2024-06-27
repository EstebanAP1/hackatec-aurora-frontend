'use client'

import { useEffect, useState } from 'react'
import font from '@/app/ui/font.module.css'
import { logout } from '@/app/lib/actions'
import { EyeIcon } from '@heroicons/react/24/outline'
import ViewData from '@/app/dashboard/_ui/view-data'
import RowOption from '@/app/dashboard/_ui/row-option'
import { getCountDiscussions, getSuicidals } from '@/app/lib/data'
import Image from 'next/image'
import { toast } from 'sonner'
import { Suicidal } from '@/app/lib/definitions'
import { capitalizeFirstLetter } from '@/app/lib/utils'
import clsx from 'clsx'
import { io } from 'socket.io-client'

type ViewData = Suicidal | null

const statusStyles = {
  'DISPONIBLE': 'bg-green-100 border-green-500 text-green-500',
  'NO DISPONIBLE': 'bg-red-100 border-red-500 text-red-500',
  'CONTACTADO': 'bg-blue-100 border-blue-500 text-blue-500'
}

export default function DashboardPage() {
  const [data, setData] = useState([] as Suicidal[])
  const [usersLenght, setUsersLenght] = useState(0)
  const [viewData, setViewData] = useState(null as ViewData)
  const [analyzed, setAnalyzed] = useState(0)

  useEffect(() => {
    if (analyzed !== 0) {
      const socket = io('http://localhost:3001')

      socket.on('data-analyzed', () => {
        setAnalyzed(analyzed + 1)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [analyzed])

  useEffect(() => {
    const fetchSuicidals = async () => {
      const response = await getSuicidals()
      if (!response.success) {
        toast.error(response.message)
        return
      }
      const distinctUsers = new Set()
      response.data.forEach((suicidal: Suicidal) => {
        distinctUsers.add(suicidal.username)
      })
      const data = response.data.sort((a: Suicidal, b: Suicidal) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })
      setUsersLenght(distinctUsers.size)
      setData(data)
    }

    fetchSuicidals()
  }, [])

  useEffect(() => {
    const fetchTotalDisscusion = async () => {
      const response = await getCountDiscussions()
      if (!response.success) {
        toast.error(response.message)
        return
      }
      setAnalyzed(response.data)
    }

    fetchTotalDisscusion()
  }, [])

  const closeData = () => {
    setViewData(null)
  }

  const changeSuicidalStatus = (id: number, status: string) => {
    const newData = data.map(suicidal => {
      if (suicidal.id === id) {
        return { ...suicidal, status }
      }
      return suicidal
    })
    setData(newData)
  }

  return (
    <>
      {viewData && <ViewData data={viewData} closeData={closeData} />}
      <div className='flex min-h-dvh w-full justify-center'>
        <div className='flex w-full max-w-7xl flex-col'>
          <header className='sticky top-0 py-8'>
            <div className='grid h-14 max-h-14 grid-cols-2 rounded-full bg-negro px-6 py-1 *:flex *:items-center'>
              <div className='justify-start gap-1'>
                <Image
                  src={'/logo-safecide.png'}
                  alt='Logo de safecide'
                  width={100}
                  height={100}
                  quality={80}
                  priority
                  className='size-10 rounded-full'
                />
                <h2 className={`${font.mazzard} text-2xl text-white`}>
                  SAFECIDE
                </h2>
              </div>
              <form action={logout} className='justify-end pr-8'>
                <button className='text-white'>Cerrar sesión</button>
              </form>
            </div>
          </header>
          <main className='flex w-full gap-5 px-2 align-baseline'>
            <div className='flex grow flex-col gap-2'>
              <div className='flex min-h-10 items-center justify-between'>
                <h3 className='text-xl font-bold'>Lista de Diagnosticados</h3>
                <input
                  type='text'
                  placeholder='Buscar paciente...'
                  className='min-w-28 rounded-3xl border border-negro bg-transparent p-2 px-4 text-sm text-negro outline-none focus:outline-none'
                />
              </div>
              <div className='flex h-min w-full items-start rounded-lg border border-negro'>
                <table className='w-full'>
                  <thead className='border-b border-negro'>
                    <tr className='*:py-2 *:text-sm *:font-normal'>
                      <th>Nombre del paciente</th>
                      <th>Grado de riesgo</th>
                      <th>Estado</th>
                      <th>Comportamiento</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((suicidal, index) => {
                      const { id, username, risk, status, behaviour } = suicidal
                      const statusStyle =
                        statusStyles[status as keyof typeof statusStyles]
                      return (
                        <tr
                          key={index}
                          className='*:py-3 hover:bg-slate-200/40'>
                          <th className='font-light'>{username}</th>
                          <th className='font-bold'>
                            {capitalizeFirstLetter(risk)}
                          </th>
                          <th className='min-w-20'>
                            <label
                              className={clsx(
                                'w-full rounded-full p-2 px-6 text-sm font-semibold [border-width:0.5px]',
                                statusStyle
                              )}>
                              {capitalizeFirstLetter(status)}
                            </label>
                          </th>
                          <th className='font-light'>
                            {capitalizeFirstLetter(behaviour)}
                          </th>
                          <th className='flex items-center justify-center gap-2'>
                            <button onClick={() => setViewData(suicidal)}>
                              <EyeIcon className='size-5' />
                            </button>
                            <RowOption
                              id={id}
                              oldStatus={status}
                              changeSuicidalStatus={changeSuicidalStatus}
                            />
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex flex-col justify-start gap-2'>
              <h3 className='flex min-h-10 items-center text-xl font-bold'>
                Datos Diagnosticados
              </h3>
              <div className='flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-negro p-3 text-end'>
                <div className='flex min-h-16 w-full flex-col items-end justify-center rounded-xl bg-verde/60 p-2 text-negro'>
                  <h4 className='text-xs'>Total de análisis</h4>
                  <span className='text-end text-3xl font-bold'>
                    {analyzed}
                  </span>
                </div>
                <div className='flex min-h-16 w-full flex-col items-end justify-center rounded-xl bg-verde/60 p-2 text-negro'>
                  <h4 className='text-xs'>Pacientes encontrados</h4>
                  <span className='text-end text-3xl font-bold'>
                    {usersLenght}
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
