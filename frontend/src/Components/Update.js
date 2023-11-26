import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Update() { 
  const params =useParams()
  const[title,setTitle] =useState('')
  const[content,setContent] =useState('')
const handleupdate=async(e)=>{
  e.preventDefault()
  try {
    
    let a = await axios.put(`http://localhost:7000/post/${params.id}`,{title, content},{headers:{"token":localStorage.getItem("token")}})
    if(a.status==200)
    alert("updated")
  } catch (error) {
   alert(error.response.data.error      )
  }
 
}
  return (
    <div>
<form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="title" class="block mb-2 text-sm font-medium">Title</label>
    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} id="title" class="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required/>
  </div>
  <div class="mb-5">
    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 ">content</label>
    <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} id="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>

  <button onClick={handleupdate} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  )
}
