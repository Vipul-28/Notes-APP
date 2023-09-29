import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Header from './component/Header/Header'
import LandingPage from './screens/Landingpage/LandingPage'
import LoginScreen from './screens/LoginPage/LoginScreen'
import MyNotes from './screens/MyNotes/MyNotes'
import RegisterScreen from './screens/RegisterPage/RegisterScreen'
import CreateNote from './screens/SingleNote/CreateNote'
import SingleNote from './screens/SingleNote/SingleNote'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={ <RegisterScreen />} />
        <Route
          path="/mynotes"
          element={
            <MyNotes />
          }
        />
        <Route path="/note/:id" element={ <SingleNote />} />
        <Route path="/createnote" element={ <CreateNote />} />;

      </Routes>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App