import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostsByTag } from '../redux/slices/posts'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import { Post } from '../components'

export const PostsByTag = () => {
  const dispatch = useDispatch()
  const { tag } = useParams()

  const userData = useSelector(state => state.auth.data)
  const postsByTag = useSelector(state => state.posts.posts)

  const isPostsLoading = postsByTag.status === 'loading'

  useEffect(() => {
    dispatch(fetchPostsByTag(tag))
  }, [])

  return (
    <div>
      <h1>Посты по тегу: {tag}</h1>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : postsByTag.items).map(
            (obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444/${obj.imageUrl}` : ''
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              )
          )}
        </Grid>
      </Grid>
    </div>
  )
}
