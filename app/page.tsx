'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import font from '@/app/ui/font.module.css'
import { ArrowToRight, HandWithFingerUp } from '@/app/ui/icons'
import Image from 'next/image'

const navSections = [
  {
    title: 'Inicio',
    href: '#home'
  },
  {
    title: 'Comportamiento',
    href: '#behaviour'
  }
]

const depressionLevels = [
  {
    title: 'Depresión Leve',
    code: 'DL',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Frases que indican tristeza o desánimo, pero sin afectar significativamente el funcionamiento diario (ej. "Me siento triste a veces", "No tengo mucha energía últimamente").'
      },
      {
        title: 'Síntomas',
        description:
          'Pérdida leve de interés en actividades, problemas menores de sueño o apetito.'
      },
      {
        title: 'Funcionalidad',
        description:
          'La persona todavía puede llevar a cabo sus actividades diarias con cierta dificultad.'
      }
    ]
  },
  {
    title: 'Depresión Moderada',
    code: 'DM',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Frases que muestran un desánimo más persistente y una pérdida de interés en la mayoría de las actividades (ej. "Me siento deprimido la mayor parte del tiempo", "Nada parece importarme").'
      },
      {
        title: 'Síntomas',
        description:
          'Pérdida notable de interés o placer en actividades, problemas más significativos de sueño, apetito y energía, sentimientos de culpa o inutilidad.'
      },
      {
        title: 'Funcionalidad',
        description:
          'La persona tiene dificultades para mantener el rendimiento en el trabajo, escuela o en sus actividades cotidianas.'
      }
    ]
  },
  {
    title: 'Depresión Severa',
    code: 'DS',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Frases que indican una profunda desesperanza, pensamientos suicidas o de autolesiones (ej. "No veo ninguna salida", "No vale la pena seguir viviendo").'
      },
      {
        title: 'Síntomas',
        description:
          'Incapacidad para experimentar placer en ninguna actividad, alteraciones graves del sueño y apetito, sentimientos intensos de culpa o inutilidad, pensamientos recurrentes de muerte o suicidio.'
      },
      {
        title: 'Funcionalidad',
        description:
          'La persona tiene una incapacidad casi total para llevar a cabo las actividades diarias, puede requerir hospitalización o intervención urgente.'
      }
    ]
  }
]

const suicideLevels = [
  {
    title: 'Riesgo Bajo',
    code: 'BR',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Pensamientos pasivos de muerte (ej. "A veces pienso que sería mejor si no estuviera aquí").'
      },
      {
        title: 'Intención',
        description: 'No hay intención de suicidio.'
      },
      {
        title: 'Planificación',
        description: 'No hay planificación de suicidio.'
      },
      {
        title: 'Medios',
        description: 'No se mencionan o no se tienen medios accesibles'
      }
    ]
  },
  {
    title: 'Riesgo Moderado',
    code: 'MR',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Pensamientos activos de suicidio sin un plan claro (ej. "Pienso en quitarme la vida a veces").'
      },
      {
        title: 'Intención',
        description: 'Alguna intención de suicidio.'
      },
      {
        title: 'Planificación',
        description:
          'Planes vagos o poco específicos (ej. "Podría tomar pastillas, pero no sé cuáles").'
      },
      {
        title: 'Medios',
        description: 'Medios limitados o no accesibles fácilmente.'
      }
    ]
  },
  {
    title: 'Riesgo Alto',
    code: 'AR',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Pensamientos activos de suicidio con un plan específico (ej. "Quiero suicidarme y sé cómo hacerlo").'
      },
      {
        title: 'Intención',
        description: 'Fuerte intención de suicidio.'
      },
      {
        title: 'Planificación',
        description:
          'Plan específico y detallado (ej. "Voy a tomar una sobredosis de medicamentos esta noche").'
      },
      {
        title: 'Medios',
        description:
          'Acceso a los medios necesarios para llevar a cabo el plan (ej. "Tengo las pastillas en casa").'
      }
    ]
  },
  {
    title: 'Riesgo Inminente',
    code: 'IR',
    descriptions: [
      {
        title: 'Expresiones Verbales',
        description:
          'Amenazas inmediatas o comportamiento preparatorio (ej. "Voy a suicidarme ahora").'
      },
      {
        title: 'Intención',
        description: 'Inminente intención de suicidio.'
      },
      {
        title: 'Planificación',
        description:
          'Plan específico e inminente (ej. "Voy a saltar del puente esta tarde").'
      },
      {
        title: 'Medios',
        description:
          'Acceso inmediato a los medios y la intención de usarlos de inmediato.'
      }
    ]
  }
]

export default function HomePage() {
  const [hash, setHash] = useState('')
  const [depression, setDepression] = useState(depressionLevels[0])
  const [suicide, setSuicide] = useState(suicideLevels[0])

  const changeHash = (href: string) => {
    const ids = navSections.map(section => section.href)
    ids.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        element.style.backgroundColor = 'transparent'
        element.style.color = '#F5F5F5'
      }
    })
    const element = document.getElementById(href)
    if (element) {
      element.style.backgroundColor = '#B5E4E1'
      element.style.color = '#201116'
    }
  }

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash)
    }

    updateHash()

    window.addEventListener('hashchange', updateHash)

    return () => {
      window.removeEventListener('hashchange', updateHash)
    }
  }, [])
  return (
    <div className='flex min-h-dvh w-full justify-center pb-10'>
      <div className='flex w-full max-w-7xl flex-col'>
        <header className='sticky top-0 py-8'>
          <div className='grid h-14 max-h-14 grid-cols-[40%_20%_40%] rounded-full bg-negro px-6 py-1 *:flex *:items-center'>
            <div className='justify-start gap-5 py-1'>
              {navSections.map(({ title, href }) => {
                const selected = hash === href

                return (
                  <Link
                    key={title}
                    id={href}
                    href={href}
                    className={clsx(
                      'flex h-full select-none items-center justify-center rounded-full px-4 font-medium text-blanco transition-all hover:scale-105 hover:opacity-90',
                      selected && 'bg-verde text-negro'
                    )}
                    onClick={() => changeHash(href)}>
                    {title}
                  </Link>
                )
              })}
            </div>
            <div className='justify-center gap-1'>
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
            <div className='justify-end pr-8'>
              <Link href={'/login'} className='text-white'>
                Iniciar sesión
              </Link>
            </div>
          </div>
        </header>
        <main className='flex flex-col items-center justify-center'>
          <section
            id='home'
            className='flex flex-col items-center justify-center gap-6 py-12 text-center *:flex *:max-w-[55%] *:items-center *:justify-center'>
            <header className='w-full flex-col'>
              <h1 className={`${font.mazzard} text-5xl text-negro`}>
                Detección <span className='text-rosa'>Temprana de</span>{' '}
                <span className='text-amarillo'>Riesgos de</span>{' '}
                <span className='text-verde'>Salud Mental</span>
              </h1>
            </header>
            <main>
              <p className='flex-col text-pretty text-lg'>
                Innovamos para proteger lo más valioso: Tu salud mental,
                ofreciendo detección temprana y precisa para intervenir a tiempo
                y transformar vidas.
              </p>
            </main>
            <footer className='flex w-full select-none gap-5'>
              <button className='flex w-full items-center justify-center gap-2 rounded border border-black/50 py-3 text-xl font-medium transition-all hover:opacity-90'>
                Ver explicación <ArrowToRight className='size-5' />
              </button>
              <Link
                href={'/login'}
                className='flex w-full items-center justify-center gap-2 rounded bg-rosa py-3 text-xl font-medium text-blanco transition-all hover:opacity-90'>
                Entrar al sistema <HandWithFingerUp className='size-5' />
              </Link>
            </footer>
          </section>
          <section
            id='behaviour'
            className='flex w-full flex-col items-center gap-10 rounded-2xl bg-verde px-28 py-10'>
            <h3 className={`${font.mazzard} text-center text-2xl text-negro`}>
              Estos son los niveles de riesgos con los que evaluamos
            </h3>
            <div className='flex flex-col gap-5'>
              <h4 className='text-xl font-medium'>
                Niveles de Severidad de Depresión
              </h4>
              <div className='grid grid-cols-[30%_70%]'>
                <div className='flex flex-col items-center justify-start text-lg font-medium'>
                  {depressionLevels.map(depressionLevel => {
                    const { title, code } = depressionLevel
                    return (
                      <button
                        key={title}
                        className={clsx(
                          'w-full p-4 text-start text-lg font-medium text-negro transition-all',
                          depression.code === code
                            ? 'rounded-l bg-verde_oscuro/20'
                            : 'hover:bg-verde_oscuro/5'
                        )}
                        onClick={() => setDepression(depressionLevel)}>
                        {title}
                      </button>
                    )
                  })}
                </div>
                <div className='flex h-60 flex-col items-start justify-center gap-2 rounded bg-blanco px-7 py-6'>
                  {depression.descriptions.map(
                    ({ title, description }, index) => (
                      <p key={index}>
                        <span className='font-semibold'>{title}:</span>{' '}
                        {description}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <h4 className='text-xl font-medium'>
                Niveles de Riesgo de Suicidio
              </h4>
              <div className='grid grid-cols-[30%_70%]'>
                <div className='flex flex-col items-center justify-start text-lg font-medium'>
                  {suicideLevels.map(suicideLevel => {
                    const { title, code } = suicideLevel
                    return (
                      <button
                        key={title}
                        className={clsx(
                          'w-full p-4 text-start text-lg font-medium text-negro transition-all',
                          suicide.code === code
                            ? 'rounded-l bg-verde_oscuro/20'
                            : 'hover:bg-verde_oscuro/5'
                        )}
                        onClick={() => setSuicide(suicideLevel)}>
                        {title}
                      </button>
                    )
                  })}
                </div>
                <div className='flex h-60 flex-col items-start justify-center gap-2 rounded bg-blanco px-7 py-6'>
                  {suicide.descriptions.map(({ title, description }, index) => (
                    <p key={index}>
                      <span className='font-semibold'>{title}:</span>{' '}
                      {description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
