 import { useNavigate } from "react-router-dom"
 

 

export const B2Home = () => {

 const navigate = useNavigate()

 const homeNav = () => {
    navigate('/')
  }

  return (
   <div className='mt-6'>
        <button onClick={homeNav} className='font-medium text-black hover:text-blue-500 hover:underline'>Back to home {'->'}</button>
        
      </div>
  )
}

