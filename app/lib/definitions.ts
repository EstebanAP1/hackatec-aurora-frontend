export interface Suicidal {
  id: number
  username: string
  email: string
  phoneNumber: number
  status: string
  risk: string
  behaviour: string
}

export interface Discussion {
  content: string
  forum: {
    id: number
    name: string
    url: string
  }
  forumId: number
  id: number
  phrases: string[]
  title: string
  url: string
}
