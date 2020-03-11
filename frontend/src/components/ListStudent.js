import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
const ListStudent=(props)=>{


    const students = useSelector(state=> state.student);
    const form = useSelector(state => state.form)
    const dispatch = useDispatch()
    let URL ='http://localhost/api/students'
     useEffect(()=>{
        getStudents();
     },[])
    
    const getStudents = async ()=>{
        const result = await axios.get(URL)
        console.log(result.data)
        dispatch({type: 'GET_STUDENTS',student: result.data})
       
    }
    const deleteStudent = async ()=>{
        await axios.delete(`http://localhost/api/students/${students.no}`)
        dispatch({type:'DELETE_STUDENT',no: students.no })
        getStudents();   
    }
    const updateStudent = async (no) => {
        await axios.put(`http://localhost/api/students/${no}`,form)
         dispatch(
             {type:'UPDATE_STUDENT',
             no: students.no,
             student:{...form, no: no}
         })
         getStudents();
       }

    const printStudents = ()=>{
        if(students && students.length){
            return students.map((student,index)=>{
                return(
                    <li key={index}>
                            {student.name}  {student.surname  } : 
                            {student.id} Major: {student.Major} GPA:{student.GPA}
                            <button onClick={deleteStudent}>DEL</button>
                            <button onClick={updateStudent}>Update</button>
                    </li> 
                )
            })
        }
        else{
            return(<h1>No data</h1>)
        }
    }


    return(
        <div>
             <ul>
                {printStudents()}
            </ul>
        </div>
    )



}
export default ListStudent


