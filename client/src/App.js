import React from 'react';
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SinglePost from "./components/pages/SinglePost";
import Dashboard from "./components/pages/Dashboard"
import NotFound from "./components/pages/NotFound";
import { AuthProvider } from "./utils/auth";

import AuthRoute from './utils/AuthRoute';

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import EditPost from './components/pages/EditPost';

function App() {
  return (
    <AuthProvider>
      <Routers basename='/'>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/dashboard/:userId" element={<Dashboard />} />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="/post/edit/:postId" element={<EditPost />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Container>
      </Routers>
    </AuthProvider>
  );
}

export default App;
