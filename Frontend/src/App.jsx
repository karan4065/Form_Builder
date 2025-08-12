import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded shadow w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Mini Form Builder</h1>
        <p className="mb-6">Create forms with Categorize, Cloze and Comprehension question types.</p>
        <div className="flex gap-3">
          <Link to="/editor" className="px-4 py-2 bg-indigo-600 text-white rounded">Open Editor</Link>
        </div>
      </div>
    </div>
  )
}