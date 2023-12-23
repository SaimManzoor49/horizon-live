import { User } from '@prisma/client'
import React from 'react'


interface RecomandedProps{
    data:User[]
}

const Recomanded = ({data}:RecomandedProps) => {
  return (
    <div>Recomanded</div>
  )
}

export default Recomanded