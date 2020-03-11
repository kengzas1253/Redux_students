import React, { useEffect }  from 'react';
import StudentCard from './StudentCard'
import './StudentList.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

const StudentList = ()=>{
    const students = useSelector(state => state.student);
    const dispatch = useDispatch();
    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
       
        const action = {type:'GET_STUDENTS',student: result.data}
        dispatch(action)
      }
      useEffect(() => {
        getStudents()
      }, [])
       console.log("data",students)
      if (!students || !students.length)
        return (<h2>No data</h2>)

    return(
        <div >
            {
                students.map((student, index) => (
                    <ul key={index} style={{ margin: 5 }}>
                        <StudentCard  {...student}  />
                    </ul>
                ))
            }
        </div>
    )


}
export default StudentList
