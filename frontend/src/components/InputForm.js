import React from 'react';
import './InputForm.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

const InputForm = props => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student)

    const addStudent = async () => {
        await axios.post(`http://localhost/api/students`, form)
        dispatch({
            type: 'ADD_STUDENT', student: {
                no: students.length > 0 ? students[students.length-1].no+1 : 0,
                ...form
            }
        })
    }

    
    return (
        <div className='form-container'>
            <h2>Add Student</h2>
           {form.name} {form.surname} {form.id} {form.Major} {form.GPA} 
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='inpt'
                                type="text"
                                onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })}
                            
                                
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Surname</td>
                        <td>
                        <input className='inpt'
                                type="text"
                                onChange={(e) => dispatch({ type: 'CHANGE_SURNAME', surname: e.target.value })}
                        />  
                        </td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>
                        <input className='inpt'
                                type="text"
                                onChange={(e) => dispatch({ type: 'CHANGE_ID', id: e.target.value })}
                        />   
                        </td>
                    </tr>
                    <tr>
                        <td>Major</td>
                        <td>
                        <input className='inpt'
                                type="text"
                                onChange={(e) => dispatch({ type: 'CHANGE_MAJOR', Major: e.target.value })}
                        />   
                        </td>
                    </tr>
                    <tr>
                        <td>GPA</td>
                        <td>
                        <input className='inpt'
                                type="number"
                                onChange={(e) => dispatch({ type: 'CHANGE_GPA', GPA: e.target.value })}
                        />   
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className='btn' onClick ={addStudent}>CREATE</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InputForm