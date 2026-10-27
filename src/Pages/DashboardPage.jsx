import React from 'react'
import AddPost from 'src/Components/Templates/AddPost'
import PostList from 'src/Components/Templates/PostList'

const DashboardPage = () => {
  return (
    <div>
      <AddPost/>
      <PostList/>
    </div>
  )
}

export default DashboardPage