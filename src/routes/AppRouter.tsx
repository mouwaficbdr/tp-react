import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../ui/layout/RootLayout';
import { PostsPage } from '../features/posts/pages/PostsPage';
import { PostDetailPage } from '../features/posts/pages/PostDetailPage';
import { PostUpsertPage } from '../features/posts/pages/PostUpsertPage';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <PostsPage /> },
      { path: 'posts/:postId', element: <PostDetailPage /> },
      { path: 'posts/new', element: <PostUpsertPage mode="create" /> },
      { path: 'posts/:postId/edit', element: <PostUpsertPage mode="edit" /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
