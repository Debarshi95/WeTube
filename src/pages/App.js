import { Loader, Navbar } from 'components';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LazyIndex = React.lazy(() => import('./IndexPage/IndexPage'));
const LazyHome = React.lazy(() => import('./Home/Home'));
const LazyCategory = React.lazy(() => import('./Category/Category'));

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
                <LazyHome />
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
