import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Post } from '../components/Post'
import { CommentsBlock } from '../components/CommentsBlock'

import axios from '../axios'
import ReactMarkdown from 'react-markdown'
import AddComment from '../components/AddComment'

import { fetchComments } from '../redux/slices/comments'
import { selectIsAuth } from '../redux/slices/auth'

export const FullPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const isAuth = useSelector(selectIsAuth)
  const comments = useSelector(state => state.comments.comments)

  const [data, setData] = useState()
  const [isLoadingPostInfo, setLoadingPostInfo] = useState(true)

  useEffect(() => {
    dispatch(fetchComments(id))

    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data)
        setLoadingPostInfo(false)
      })
      .catch(err => {
        console.warn(err)
        alert('Ошибка при получении статьи')
      })
  }, [])

  if (isLoadingPostInfo) {
    return <Post isLoading={isLoadingPostInfo} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments.items}
        editable={true}
        isLoading={comments.status === 'loading'}
      />
      {isAuth && <AddComment postId={id} />}
    </>
  )
}
