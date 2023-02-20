import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './AddComment.module.scss'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

import { fetchComment } from '../../redux/slices/comments'

const AddComment = ({ postId }) => {
  const dispatch = useDispatch()
  const fullName = useSelector(state => state.auth.data.fullName)
  const [comment, setComment] = useState('')

  const onSubmit = async () => {
    try {
      const fields = {
        params: { fullName, comment },
        postId
      }

      await dispatch(fetchComment(fields))
    } catch (err) {
      console.warn('Ошибка при создании комментария')
    }
    setComment('')
  }

  const onChangeComment = value => {
    setComment(value)
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            onChange={e => onChangeComment(e.target.value)}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddComment
