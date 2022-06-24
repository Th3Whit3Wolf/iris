import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Header, Footer, Body, StudentView, InstructorView } from '#components';

const App = () => {
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <Header />
      <Body>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/student' element={<StudentView />} />
          <Route path='/instructor' element={<InstructorView />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Body>
      <Footer />
    </Router>
  )
}

export default App