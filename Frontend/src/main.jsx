import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
 import './index.css'
 import App from './App'
 import EditorPage from './pages/EditorPage'
 import PreviewPage from './pages/PreviewPage'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/editor' element={<EditorPage/>} />
        <Route path='/preview/:id' element={<PreviewPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)