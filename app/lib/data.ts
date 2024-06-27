'use server'

const api = process.env.API_URL

export async function getSuicidals() {
  try {
    const response = await fetch(`${api}/suicidals`)
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
      message: 'Error al obtener los datos.'
    }
  }
}
