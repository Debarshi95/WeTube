import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loader, Navbar, NotFound, PrivateRoute } from 'components';

const LazyIndex = React.lazy(() => import('./IndexPage/IndexPage'));
const LazyHome = React.lazy(() => import('./Home/Home'));
const LazyCategory = React.lazy(() => import('./Category/Category'));
const LazyVideo = React.lazy(() => import('./Video/Video'));
const LazySignIn = React.lazy(() => import('./SignIn/SignIn'));
const LazySignup = React.lazy(() => import('./Signup/Signup'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <LazyIndex />
            </Suspense>
          }
        >
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<Loader />}>
                <PrivateRoute>
                  <LazyHome />
                </PrivateRoute>
              </Suspense>
            }
          />

          <Route
            path="/category/*"
            index
            element={
              <Suspense fallback={<Loader />}>
                <LazyCategory />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/video/:name"
          index
          element={
            <Suspense fallback={<Loader />}>
              <LazyVideo />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          index
          element={
            <Suspense fallback={<Loader />}>
              <LazySignIn />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          index
          element={
            <Suspense fallback={<Loader />}>
              <LazySignup />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
