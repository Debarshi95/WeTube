import { Navbar } from 'components';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const LazyHome = React.lazy(() => import('./Home/Home'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<h1>Loading</h1>}>
              <LazyHome />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
