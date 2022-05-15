import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loader, Navbar, NotFound } from 'components';

const IndexPage = lazy(() => import('./IndexPage/IndexPage'));
const HomePage = lazy(() => import('./Home/Home'));
const CategoryPage = lazy(() => import('./Category/Category'));
const VideoPage = lazy(() => import('./Video/Video'));
const SignInPage = lazy(() => import('./SignIn/SignIn'));
const SignUpPage = lazy(() => import('./Signup/Signup'));
const HistoryPage = lazy(() => import('./History/History'));
const PlayListPage = lazy(() => import('./Playlist/Playlist'));
const WatchLaterPage = lazy(() => import('./WatchLater/WatchLater'));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <IndexPage />
              </Suspense>
            }
          >
            <Route
              path="/"
              index
              element={
                <Suspense fallback={<Loader />}>
                  <HomePage />
                </Suspense>
              }
            />

            <Route
              path="category/*"
              index
              element={
                <Suspense fallback={<Loader />}>
                  <CategoryPage />
                </Suspense>
              }
            />
            <Route
              path="/history"
              index
              element={
                <Suspense fallback={<Loader />}>
                  <HistoryPage />
                </Suspense>
              }
            />
            <Route
              path="/playlist"
              index
              element={
                <Suspense fallback={<Loader />}>
                  <PlayListPage />
                </Suspense>
              }
            />
            <Route
              path="/watchlater"
              index
              element={
                <Suspense fallback={<Loader />}>
                  <WatchLaterPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/video/:name"
            index
            element={
              <Suspense fallback={<Loader />}>
                <VideoPage />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            index
            element={
              <Suspense fallback={<Loader />}>
                <SignInPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            index
            element={
              <Suspense fallback={<Loader />}>
                <SignUpPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
