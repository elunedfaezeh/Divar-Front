import React from 'react'
import CategoryForm from 'src/Components/Templates/CategoryForm'
import CategoryList from 'src/Components/Templates/CategoryList'

const AdminPage = () => {
  return (
    <div>
      <CategoryList/>
      <CategoryForm/>
    </div>
  )
}

export default AdminPage