import React from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './components/StudentList'
import InputForm from './components/InputForm'
import axios from 'axios'
import {useSelector,useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  
  const getStudents = async () => {
    const result = await axios.get(`http://localhost/api/students`)
    const action = {type:'GET_STUDENTS',student: result.data}
    dispatch(action)
  }

  return (
    <div>
      <h2>Redux student</h2>
      <StudentList/>
      <InputForm/>
      
    </div>
  );
}

export default App;
