import React, { useState, useEffect } from 'react'
import API from '../api'
import Categorize from '../components/QuestionTypes/Categorize'
import Cloze from '../components/QuestionTypes/Cloze'
import Comprehension from '../components/QuestionTypes/Comprehension'

function emptyQuestion(type){
  if(type === 'categorize') return { type, questionText: '', categories: ['Category 1','Category 2'], items:['Item 1','Item 2'], imageUrl: '' }
  if(type === 'cloze') return { type, questionText: 'Enter text with __blank__ placeholders', blanks: [], imageUrl: '' }
  if(type === 'comprehension') return { type, passage: '', questionText:'', options:[], imageUrl: '' }
  return { type:'text', questionText:'', imageUrl:'' }
}

export default function EditorPage(){
  const [title, setTitle] = useState('New Form')
  const [headerImage, setHeaderImage] = useState('')
  const [questions, setQuestions] = useState([])
  const [saving, setSaving] = useState(false)

  const addQuestion = (type)=> setQuestions(prev => [...prev, emptyQuestion(type)])
  const updateQuestion = (idx, data)=> setQuestions(prev => prev.map((q,i)=> i===idx ? {...q,...data} : q))
  const removeQuestion = (idx)=> setQuestions(prev => prev.filter((_,i)=> i!==idx))

  const uploadFile = async (file)=>{
    const fd = new FormData();
    fd.append('file', file);
    const res = await API.post('/upload', fd, { headers:{ 'Content-Type':'multipart/form-data' } });
    return res.data.url;
  }

  const saveForm = async ()=>{
    setSaving(true)
    try{
      const payload = { title, headerImage, questions }
      const res = await API.post('/forms', payload)
      alert('Saved! form id: ' + res.data._id)
      const previewUrl = `/preview/${res.data._id}`
      window.open(previewUrl, '_blank')
    }catch(err){
      console.error(err)
      alert('Error saving form')
    }finally{
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Form Editor</h1>
        
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Form Title"
        />

        <div className="mb-4">
          <label className="block mb-1">Header Image</label>
          <input type="file" onChange={async e=>{
            const file = e.target.files[0]
            if(file){
              const url = await uploadFile(file)
              setHeaderImage(url)
            }
          }} />
          {headerImage && <img src={headerImage} alt="" className="mt-2 h-32 object-cover" />}
        </div>

        {questions.map((q, idx)=>(
          <div key={idx} className="mb-6 border p-4 rounded">
            {q.type === 'categorize' && <Categorize data={q} onChange={data=>updateQuestion(idx, data)} />}
            {q.type === 'cloze' && <Cloze data={q} onChange={data=>updateQuestion(idx, data)} />}
            {q.type === 'comprehension' && <Comprehension data={q} onChange={data=>updateQuestion(idx, data)} />}
            <button onClick={()=>removeQuestion(idx)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">Remove</button>
          </div>
        ))}

        <div className="flex gap-2 mb-6">
          <button onClick={()=>addQuestion('categorize')} className="px-4 py-2 bg-indigo-500 text-white rounded">Add Categorize</button>
          <button onClick={()=>addQuestion('cloze')} className="px-4 py-2 bg-indigo-500 text-white rounded">Add Cloze</button>
          <button onClick={()=>addQuestion('comprehension')} className="px-4 py-2 bg-indigo-500 text-white rounded">Add Comprehension</button>
        </div>

        <button
          disabled={saving}
          onClick={saveForm}
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          {saving ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </div>
  )
}
