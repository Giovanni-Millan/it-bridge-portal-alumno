import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default function ListarPerfil() {

    const {id}=useParams();
    const [data, setData] = useState([])

    useEffect(() => {  
        console.log(id)
        axios.get('http://localhost:4000/ConsultarPerfilesDeEmparejamientoPorId/'+id)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
        console.log(data)
    }, [id])


  return (
    <main>
        <Navbar titulo="Emparejamiento Estudiantil"/>
        <div className='mt-10'>  
            <Link to="/ConsultarPerfiles" className='bg-purple-300 ml-16 p-4 text-purple-950 rounded-md hover:bg-purple-500'><FontAwesomeIcon icon={faArrowLeft} /></Link>
        </div>


        <section className='flex justify-center items-center'>
            <div className=''>
                <h1 className=''>Nombre:</h1>
                <h1 className='text-2xl mb-8 font-bold'>{data.nombre}</h1>

                <h1 className=''>Apellido Paterno:</h1>
                <h1 className='text-2xl mb-8 font-bold'>{data.apellido_paterno}</h1>

                <h1 className=''>Apellido Materno:</h1>
                <h1 className='text-2xl mb-8 font-bold'>{data.apellido_materno}</h1>

                <h1 className=''>Semestre:</h1>
                <h1 className='text-2xl mb-8 font-bold'>{data.semestre}</h1>
                <h1 className=''>Materia de especialidad</h1>
                <h1 className='text-2xl mb-8 font-bold'>{data.nombre_materia}</h1>

                <Link to='/ConsultarPerfiles' className='bg-purple-800 hover:bg-purple-950 hover:cursor-pointer py-2 px-12 text-white w-full rounded-lg'>Regresar</Link>
            </div>

        </section>

    </main>
  )
}

