import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'

import './styles/global.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CustomersPage } from './components/pages/customers'
import { ServicesPage } from './components/pages/services'
import { ProductsPage } from './components/pages/products'
import { ListsPage } from './components/pages/reports'
import { AppLayout } from './components/layouts/app'
import { PetsPage } from './components/pages/pets'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <CustomersPage />,
      },
      {
        path: '/pets',
        element: <PetsPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/services',
        element: <ServicesPage />,
      },
      {
        path: '/reports',
        element: <ListsPage />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')

if (rootElement)
  createRoot(rootElement).render(
    <StrictMode>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </StrictMode>,
  )
