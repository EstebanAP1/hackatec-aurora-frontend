'use server'

const api = process.env.API_URL

export async function getSuicidals() {
  try {
    const response = await fetch(`${api}/suicidals`)
    if (!response.ok)
      throw new Error('Error al obtener los datos de pacientes.')

    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error al obtener los datos de pacientes.'
    }
  }
}

export async function getCountDiscussions() {
  try {
    const response = await fetch(`${api}/discussions/count-all`)
    if (!response.ok) throw new Error('Error al obtener los datos de conteo.')

    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error al obtener los datos de conteo.'
    }
  }
}

export async function getDiscussionBySuicidal(id: number) {
  try {
    const response = await fetch(`${api}/discussions/get-by-suicidal/${id}`)
    if (!response.ok) throw new Error('Error al obtener los datos.')

    const data = await response.json()
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error al obtener los datos de discusiones.'
    }
  }
}
