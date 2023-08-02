import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { Api_state as ApiState } from './App/Context/Api';
import { RouterProvider, createBrowserRouter, parsePath, useNavigate, useParams } from 'react-router-dom';
import { oops } from './App/Context/Images';
import { Search } from './App/Components/Search';
import { Navbar } from './App/Components/Navbar';
import "./App/Styles/App.css";
import { About } from './App/Components/About';
import { Auth } from './App/Components/Auth';
import { _404 } from './App/Components/404';
import { Category } from './App/Components/Category';
import { PrivacyPolicy } from './App/Components/PrivacyPolicy';
import { Profile } from './App/Components/Profile';
import { Settings } from './App/Components/Settings';

const root = ReactDOM.createRoot(document.getElementById('root'));

// console.log(parsePath(useParams().keyword ? useParams().keyword : ""))

const router = createBrowserRouter([
  {
    errorElement: <_404 />,
    path: "/",
    element: <App />
  },
  {
    errorElement: <_404 />,
    path: "/search/:keyword",
    element: <Search />
  },
  {
    errorElement: <_404 />,
    path: "/privacy_policy",
    element: <><Navbar/><PrivacyPolicy /></>
  },
  {
    errorElement: <_404 />,
    path: "/my_profile",
    element: <><Navbar/><Profile /></>
  },
  {
    errorElement: <_404 />,
    path: "/settings",
    element: <><Navbar/><Settings /></>
  },
  {
    errorElement: <_404 />,
    path: "/about",
    element: <><Navbar /><About /></>
  },
  {
    errorElement: <_404 />,
    path: "/category/:category",
    element: <><Navbar /><Category /></>
  },
  {
    errorElement: <_404 />,
    path: "/login",
    element: <><Auth type={"login"} /></>
  },
  {
    errorElement: <_404 />,
    path: "/signup",
    element: <><Auth /></>
  },
  {
    errorElement: <_404 />,
    path: "/search/",
    element: <>
      <Navbar />
      <div className='image-container'>
        <div className='offline'>
          <h2 className='brand-name text-center'>Please Type something in the search to <span >Get Started</span>.</h2>
          <img src={oops} alt='' />
        </div>
      </div>
    </>
  }
], { basename: "/" });

root.render(
  <React.StrictMode>
    <ApiState>
      <RouterProvider router={router} />
    </ApiState>
  </React.StrictMode>
);
