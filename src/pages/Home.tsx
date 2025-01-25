import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  console.log(token,'token');
  useEffect(()=>{
    if(token === null){
      navigate('/login')
    }
  },[token])
  
  return (
    <div>Home</div>
  )
}

export default Home