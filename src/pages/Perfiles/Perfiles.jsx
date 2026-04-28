import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Perfiles() {

  const [alumno,setAlumno]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:4000/ConsultarPerfilesDeEmparejamiento')
    .then(res=>setAlumno(res.data))
    .catch(err=>console.log(err))
    console.log(alumno)
    
  },[])


  return (
    <main>
        <Navbar titulo="Emparejamiento Estudiantil"/>
        <div className='mt-10'>  
            <Link to="/Dashboard" className='bg-purple-300 ml-16 p-4 text-purple-950 rounded-md hover:bg-purple-500'><FontAwesomeIcon icon={faArrowLeft} /></Link>
        </div>

        <section className='flex justify-center mt-14'>
                <table className=' bg-purple-100'>
                    <tr className='bg-purple-700 text-white text-center border-2 border-purple-300'>
                        <td className='px-5'>Nombre</td>
                        <td className='px-5'>Apellido paterno</td>
                        <td className='px-5'>Apellido materno</td>
                        <td className='px-5'>semestre</td>                    
                        <td className='px-5'>Materia de especialidad</td>
                        <td></td>
                        
                    </tr>
                {
                    alumno.map((data,i)=>(
                    <tr key={i} className='border-2 m-2'>
                        <td className='border-2 border-purple-300 text-center p-2'>{data.nombre} </td>
                        <td className='border-2 border-purple-300 text-center p-2'>{data.apellido_paterno}</td>
                        <td className='border-2 border-purple-300 text-center p-2'>{data.apellido_materno}</td>
                        <td className='border-2 border-purple-300 text-center p-2'>{data.semestre}</td>
                        <td className='border-2 border-purple-300 text-center p-2'>{data.nombre_materia}</td>
                        
                        <td className='border-2 border-purple-300 text-center p-2 bg-blue-700 hover:bg-blue-800 hover:cursor-pointer'><Link to={'/ListarAlumno/'+data.id_alumno}><FontAwesomeIcon icon={faMagnifyingGlass} className='text-white px-1'/></Link></td>
                        
                    </tr>          
                    ))
                }
                </table>
        </section>

    </main>
  )
}
