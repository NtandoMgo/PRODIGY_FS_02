import { useState } from 'react'
import './App.css'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import EmployeeService from './services/EmployeeService'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Employee Management System</p>
      <EmployeeForm/>
      <EmployeeList/>
      <EmployeeService/>
    </>
  )
}

export default App
