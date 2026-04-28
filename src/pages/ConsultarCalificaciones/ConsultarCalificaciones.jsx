import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBook,
  faChartLine,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function HistorialAcademicoAlumno() {

  const [alumno, setAlumno] = useState([]);
  const [infoAlumno, setInfoAlumno] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);

        // 🔐 Usuario autenticado
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData?.user) {
          throw new Error("No hay sesión activa");
        }

        const correo = userData.user.email;

        // 📚 Obtener info del alumno
        const { data: alumnoInfo, error: errorAlumno } =
          await supabase
            .from("alumnos")
            .select("*")
            .eq("correo", correo)
            .single();

        if (errorAlumno) throw errorAlumno;

        setInfoAlumno(alumnoInfo);

        // 🧾 Obtener calificaciones por ID
        const { data: calificaciones, error: errorCal } =
          await supabase
            .from("calificaciones")
            .select(`
              id,
              materia,
              calificacion,
              periodo_cuatrimestre,
              ano_cuatrimestre,
              fecha_registro
            `)
            .eq("id_alumno", alumnoInfo.id)
            .order("materia", { ascending: true });

        if (errorCal) throw errorCal;

        setAlumno(calificaciones);

      } catch (err) {

        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message
        });

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  // ================= PROMEDIO =================

  const calcularPromedio = () => {

    const validas = alumno
      .map(a => Number(a.calificacion))
      .filter(c => !isNaN(c));

    if (validas.length === 0) return 0;

    const suma = validas.reduce((acc, val) => acc + val, 0);

    return (suma / validas.length).toFixed(1);

  };

  const obtenerEstado = (cal) => {

    if (cal >= 8) return "Aprobado";
    if (cal >= 6) return "Regular";
    return "Reprobado";

  };

  const obtenerColor = (cal) => {

    if (cal >= 8) return "bg-green-100 text-green-700";
    if (cal >= 6) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";

  };

  if (loading) {

    return (
      <main className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-16 w-16 border-b-4 border-purple-700 rounded-full"></div>
      </main>
    );

  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100">

      <Navbar titulo="Historial Académico" />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* BOTÓN REGRESAR */}

        <div className="mb-6">

          <button
            onClick={() => navigate(-1)}
            className="bg-white border border-purple-200 text-purple-700 px-5 py-2 rounded-lg shadow hover:bg-purple-50 transition flex items-center gap-2"
          >

            <FontAwesomeIcon icon={faArrowLeft} />

            Regresar

          </button>

        </div>

        {/* INFO ALUMNO */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">

          <div className="flex items-center gap-4 mb-4">

            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-purple-600 text-3xl"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {infoAlumno?.nombre}
                {" "}
                {infoAlumno?.apellido_paterno}
                {" "}
                {infoAlumno?.apellido_materno}
              </h2>

              <p className="text-gray-500">
                {infoAlumno?.correo}
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="bg-purple-50 p-5 rounded-xl text-center">

              <FontAwesomeIcon
                icon={faChartLine}
                className="text-purple-600 text-2xl mb-2"
              />

              <p className="text-gray-600">
                Promedio
              </p>

              <p className="text-3xl font-bold text-purple-700">
                {calcularPromedio()}
              </p>

            </div>

            <div className="bg-green-50 p-5 rounded-xl text-center">

              <FontAwesomeIcon
                icon={faBook}
                className="text-green-600 text-2xl mb-2"
              />

              <p className="text-gray-600">
                Materias
              </p>

              <p className="text-3xl font-bold text-green-700">
                {alumno.length}
              </p>

            </div>

            <div className="bg-blue-50 p-5 rounded-xl text-center">

              <p className="text-gray-600">
                Estado General
              </p>

              <p className="text-xl font-bold text-blue-700 mt-2">

                {calcularPromedio() >= 6
                  ? "Activo"
                  : "En riesgo"}

              </p>

            </div>

          </div>

        </div>

        {/* TABLA */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="min-w-full">

            <thead className="bg-purple-600 text-white">

              <tr>

                <th className="py-3 px-6 text-left">
                  Materia
                </th>

                <th className="py-3 px-4 text-center">
                  Periodo
                </th>

                <th className="py-3 px-4 text-center">
                  Año
                </th>

                <th className="py-3 px-4 text-center">
                  Calificación
                </th>

                <th className="py-3 px-4 text-center">
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              {alumno.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >

                    No hay calificaciones registradas

                  </td>

                </tr>

              ) : (

                alumno.map((data, i) => {

                  const cal = Number(data.calificacion);

                  return (

                    <tr
                      key={i}
                      className="border-b hover:bg-purple-50"
                    >

                      <td className="py-3 px-6">
                        {data.materia}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {data.periodo_cuatrimestre}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {data.ano_cuatrimestre}
                      </td>

                      <td className="py-3 px-4 text-center font-bold">
                        {cal}
                      </td>

                      <td className="py-3 px-4 text-center">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${obtenerColor(cal)}
                          `}
                        >

                          {obtenerEstado(cal)}

                        </span>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );

}