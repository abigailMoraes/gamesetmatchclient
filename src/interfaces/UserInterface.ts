export interface User {
  email: string
  firebaseId:string
  id: number
  role: number
  name: string
}

export enum UserRoles {
  Employee,
  Admin,
  RootAdmin,
}
