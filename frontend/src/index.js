import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './utils/style/globalStyle.css'
import Signup from './pages/signup';
import Signin from './pages/signin';
import Home from './pages/home';
import Error from './pages/error';
import Profile from './pages/profile';
import Feed from './pages/feed';
import EditProfile from './pages/edit-profile'
import Write from './pages/write'
import Post from './pages/post'
import EditPost from './pages/edit-post'
import Admin from './pages/admin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="write" element={<Write />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="post/:id/edit" element={<EditPost />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
