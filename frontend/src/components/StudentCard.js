import React, { useEffect }  from 'react';
import './StudentList.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

const StudentCard = (props)=>{
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)

    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
       
        const action = {type:'GET_STUDENTS',student: result.data}
        dispatch(action)
      }
      useEffect(() => {
        getStudents()
      }, [])

    const deleteStudent = async ()=>{
        await axios.delete(`http://localhost/api/students/${props.no}`)
        dispatch({type:'DELETE_STUDENT',no: props.no })
        getStudents()
          
    }
    const updateStudent = async () => {
        await axios.put(`http://localhost/api/students/${props.no}`,form)
         dispatch(
             {type:'UPDATE_STUDENT',
             no: props.no,
             student:{...form, no:  props.no}
         })
         getStudents()
         
       }
         
       
    
    return(
        <div >
          <li>{props.name} {props.surname} :{props.id} : {props.Major} GPA {props.GPA}
          <button onClick={deleteStudent}>Delete</button>
          <button onClick={updateStudent}>Update</button>

          </li>
    </div>
    )


}
export default StudentCard
