import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, PostsByTag } from "./pages";
import { fetchAuthMeInfo } from "./redux/slices/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMeInfo());
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<PostsByTag />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
