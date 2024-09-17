import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { AuthProvider } from './components/context/AuthProvider'
import Home from './components/page/Home';
import SignUp from './components/Auth/SignUp';


function App() {
  // const todos = [new Todo('Learn React'), new Todo('Learn Typescript'), new Todo('Learn Data Analytics')];

  
  return (
    <Router>
      <AuthProvider>
      <ErrorBoundary>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
       </ErrorBoundary>
        </AuthProvider>
      </Router>
    

  )
}

export default App
