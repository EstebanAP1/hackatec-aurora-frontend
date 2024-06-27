'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as crypto from 'crypto'
import z from 'zod'

const api = process.env.API_URL
const aesKey = process.env.AES_KEY as crypto.CipherKey

export async function decrypt(encryptedText: string) {
  if (!encryptedText) return null
  const [ivHex, encrypted] = encryptedText.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export async function getToken() {
  const token = await decrypt(cookies().get('AuthToken')?.value as string)
  if (!token) redirect('/login')
  const tokenData = jwtDecode(token)
  if (!tokenData) {
    cookies().delete('AuthToken')
    redirect('/login')
  }
  return {
    token,
    tokenData
  }
}

const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Por favor ingrese una contraseña',
      invalid_type_error: 'Por favor ingrese una contraseña válida.'
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
  password: z
    .string({
      required_error: 'Por favor ingrese una contraseña',
      invalid_type_error: 'Por favor ingrese una contraseña válida.'
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
})

type State = {
  errors?: {
    username?: string[]
    password?: string[]
  }
  message?: string
}

export async function login(prevState: State, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  try {
    const validation = loginSchema.safeParse({ username, password })
    if (!validation.success)
      return {
        errors: validation.error.flatten().fieldErrors,
        message:
          validation.error.flatten().fieldErrors.username?.[0] ||
          validation.error.flatten().fieldErrors.password?.[0] ||
          '',
        success: false
      }

    const response = await fetch(`${api}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      return {
        message: 'El correo ingresado no existe o la contraseña es incorrecta.',
        success: false
      }
    }

    if (!response.ok) throw new Error('Error logging in')

    const token = await response.text()
    if (!token)
      return {
        message: 'El correo ingresado no existe o la contraseña es incorrecta.',
        success: false
      }

    cookies().set('AuthToken', token, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    })
    return { message: 'Sesión iniciada correctamente.', success: true }
  } catch (error) {
    return {
      message: 'Lo siento, hemos tenido un error al iniciar sesión.',
      success: false
    }
  }
}

export async function googleLogin() {
  return `${api}/auth/google-login`
}

export async function facebookLogin() {
  return `${api}/auth/facebook-login`
}

export async function logout() {
  try {
    const { token } = await getToken()
    await fetch(`${api}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {}
  cookies().delete('AuthToken')
  redirect('/')
}

export async function updateSuicidalStatus(id: string, status: string) {
  try {
    const response = await fetch(
      `${api}/suicidals/update-status/${id}/${status}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) throw new Error('Error updating status')

    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Ha ocurrido un error al actualizar el estado.'
    }
  }
}
