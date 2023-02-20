import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SideBlock } from './SideBlock'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import ConfirmIcon from '@mui/icons-material/Check'
import '../index.css'

import {
  fetchRemoveComment,
  fetchUpdateComment
} from '../redux/slices/comments'
import { getAuthName } from '../redux/slices/auth'

export const CommentsBlock = ({ items, editable, isLoading }) => {
  const dispatch = useDispatch()
  const authUserName = useSelector(getAuthName)

  const [editComment, setEditComment] = useState({
    id: null,
    value: ''
  })

  const handleEditIcon = (id, text) => {
    setEditComment({ id, value: text })
  }

  const handleConfirmIcon = async () => {
    await dispatch(fetchUpdateComment(editComment))
    setEditComment({ id: null, value: '' })
  }

  const handleDeleteIcon = id => {
    if (window.confirm('Вы действительно хотите удалить комментарий?')) {
      dispatch(fetchRemoveComment(id))
    }
  }

  const onChangeEditInput = e => {
    setEditComment({ ...editComment, value: e.target.value })
  }

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.fullName} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  {obj.fullName === authUserName && (
                    <div className="editButtons">
                      {!editComment.id && editable && (
                        <>
                          <IconButton color="primary">
                            <EditIcon
                              onClick={() =>
                                handleEditIcon(obj._id, obj.comment)
                              }
                            />
                          </IconButton>
                          <IconButton color="secondary">
                            <DeleteIcon
                              onClick={() => handleDeleteIcon(obj._id)}
                            />
                          </IconButton>
                        </>
                      )}
                      {editComment.id && (
                        <IconButton onClick={handleConfirmIcon} color="success">
                          <ConfirmIcon />
                        </IconButton>
                      )}
                    </div>
                  )}
                  {editComment.id !== obj._id ? (
                    <ListItemText
                      primary={obj.fullName}
                      secondary={obj.comment}
                    />
                  ) : (
                    <input
                      onChange={e => onChangeEditInput(e)}
                      value={editComment.value}
                      style={{ marginTop: '5px', height: '40px', width: '40%' }}
                    />
                  )}
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  )
}
