import Resource from "./Resource"

export default interface Project {
  id: string
  //   task: 'video' | 'scripts' | 'slides'
  task: 'video' | 'scripts' | 'slides' | 'presentation' | 'social post'
  name: string
  resources: Resource[]
  created_datetime: string
}