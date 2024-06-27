'use client'

import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { toast } from 'sonner'
import { facebookLogin, googleLogin, login } from '@/app/lib/actions'
import { Input } from '@/app/ui/input'
import { Button } from '@/app/ui/button'
import font from '@/app/ui/font.module.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { FacebookIcon, GoogleIcon } from '@/app/ui/icons'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const initialState = {
    errors: {},
    message: '',
    success: false
  }

  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [state, authenticate] = useFormState(login, initialState)

  const turnOnLoading = () => setLoading(true)
  const turnOffLoading = () => setLoading(false)

  useEffect(() => {
    if (!state.errors && state.success) {
      toast.success(state.message, {
        duration: 1000
      })
      push('/')
      return
    }
    if (state.message) {
      toast.error(state.message, {
        duration: 5000
      })
    }
  }, [state, push])

  const changeVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='flex h-dvh w-dvw items-center justify-center bg-blanco'>
      <section className='flex min-h-[90%] w-full max-w-6xl flex-col items-center justify-center gap-12 rounded-xl bg-negro py-10'>
        <header className='flex items-center justify-center'>
          <Link href={'/'} className='flex items-center justify-center gap-1'>
            <Image
              src={'/logo-safecide.png'}
              alt='Logo de safecide'
              width={100}
              height={100}
              quality={80}
              priority
              className='size-14 rounded-full'
            />
            <h2 className={`${font.mazzard} text-4xl text-white`}>SAFECIDE</h2>
          </Link>
        </header>
        <main className='flex w-full flex-col items-center justify-center gap-10'>
          <form
            action={authenticate}
            className='flex w-[30%] flex-col items-center gap-6'>
            <div className='relative flex w-full items-start'>
              <Input
                type='text'
                id='username'
                name='username'
                placeholder=''
                className={clsx(
                  'peer',
                  state?.errors?.username && 'border-red-500'
                )}
                value={username}
                onChange={event =>
                  setUsername(event.target.value.replace(/\s/g, ''))
                }
                autoFocus
                autoComplete='off'
                spellCheck={false}
                aria-required
              />
              <label
                htmlFor='username'
                className='pointer-events-none absolute start-4 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-negro px-1 font-medium text-blanco transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
                Usuario / Correo
              </label>
            </div>
            <div className='relative flex w-full items-start'>
              <Input
                type={visible ? 'text' : 'password'}
                id='password'
                name='password'
                value={password}
                placeholder=''
                onChange={event => setPassword(event.target.value)}
                className={clsx(
                  'peer rounded-r-none border-r-0',
                  state.errors?.password && 'border-red-500'
                )}
                spellCheck={false}
                aria-required
              />
              <label
                htmlFor='password'
                className='pointer-events-none absolute start-4 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-negro px-1 font-medium text-blanco transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75'>
                Ingresa tu contraseña
              </label>
              <span
                className={clsx(
                  'flex cursor-pointer items-center justify-center rounded-r-full border-2 border-l-0 border-blanco p-2',
                  state.errors?.password && 'border-red-500'
                )}
                onClick={changeVisibility}>
                {visible ? (
                  <EyeIcon
                    className={clsx(
                      'size-6 text-blanco',
                      state?.errors?.password && 'text-red-500'
                    )}
                  />
                ) : (
                  <EyeSlashIcon
                    className={clsx(
                      'size-6 text-blanco',
                      state.errors?.password && 'text-red-500'
                    )}
                  />
                )}
              </span>
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-1 text-center'>
              <LoginButton />
              <p className='text-blanco'>
                ¿No tienes una cuenta?{' '}
                <Link href='/register' className='font-medium'>
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
          <p className='relative flex items-center justify-center text-center text-blanco before:absolute before:right-[110%] before:h-px before:w-52 before:bg-blanco after:absolute after:left-[110%] after:h-px after:w-52 after:bg-blanco'>
            Inicia con
          </p>
          <div className='flex flex-col gap-2'>
            <GoogleLoginButton
              loading={loading}
              turnOnLoading={turnOnLoading}
              turnOffLoading={turnOffLoading}
            />
            <FacebookLoginButton
              loading={loading}
              turnOnLoading={turnOnLoading}
              turnOffLoading={turnOffLoading}
            />
          </div>
        </main>
      </section>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      className={clsx(
        'text-lg font-medium text-blanco transition-all hover:scale-105',
        pending ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      aria-disabled={pending}
      disabled={pending}
      id='custom-login'>
      Iniciar sesión
    </button>
  )
}

function GoogleLoginButton({
  loading,
  turnOnLoading,
  turnOffLoading
}: {
  loading: boolean
  turnOnLoading: () => void
  turnOffLoading: () => void
}) {
  return (
    <Button
      type='button'
      onClick={async () => {
        turnOnLoading()
        const loginUrl = await googleLogin()
        if (loginUrl) {
          window.location.href = loginUrl as string
          return
        }
        toast.error('Error al iniciar sesión con Google.')
        turnOffLoading()
      }}
      className={clsx(
        'flex w-full flex-row items-center justify-center gap-1 hover:scale-105',
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      aria-label='Log in with Google'
      disabled={loading}
      aria-disabled={loading}>
      <GoogleIcon className='size-6' />
      <p className='grow'>Iniciar sesión con Google</p>
    </Button>
  )
}

function FacebookLoginButton({
  loading,
  turnOnLoading,
  turnOffLoading
}: {
  loading: boolean
  turnOnLoading: () => void
  turnOffLoading: () => void
}) {
  return (
    <Button
      type='button'
      onClick={async () => {
        turnOnLoading()
        const loginUrl = await facebookLogin()
        if (loginUrl) {
          window.location.href = loginUrl as string
          return
        }
        toast.error('Error al iniciar sesión con Facebook.')
        turnOffLoading()
      }}
      className={clsx(
        'flex w-full flex-row items-center justify-center gap-2 hover:scale-105',
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      aria-disabled={loading}
      disabled={loading}
      aria-label='Log in with Facebook'>
      <FacebookIcon className='size-6' />
      <p className='grow'>Iniciar sesión con Facebook</p>
    </Button>
  )
}
