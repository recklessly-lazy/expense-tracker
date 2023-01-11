import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ExpenseDetail() {

    // const history = useNavigate();
    const { id } = useParams()
    

  return (
    <div>ExpenseDetail page</div>
  )
}

export default ExpenseDetail