import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchLastComments } from "../redux/slices/comments";

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const lastComments = useSelector((state) => state.comments.comments.items);

  const [sortPostsBy, setSortPostsBy] = useState(0);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts(sortPostsBy));
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [sortPostsBy])

  const handleSortByNew = () => setSortPostsBy(0);
  const handleSortByPopularity = () => setSortPostsBy(1);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sortPostsBy} aria-label="basic tabs example">
        <Tab onClick={handleSortByNew} label="Новые" />
        <Tab onClick={handleSortByPopularity} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastComments}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
