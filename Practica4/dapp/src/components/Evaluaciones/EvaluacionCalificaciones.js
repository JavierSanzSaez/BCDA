import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useParams, Link } from "react-router-dom";

const { useDrizzle } = drizzleReactHooks;


export const EvaluacionCalificaciones = () => {
    const { useCacheCall } = useDrizzle();

    let { evaluacionIndex } = useParams();

    let cells = useCacheCall(['Asignatura'], call => {
        let cells = [];
        const matriculadosLength = call("Asignatura", "matriculasLength") || 0;
        for (let ei = 0; ei < matriculadosLength; ei++) {
            let alumnoAddr = call("Asignatura", "matriculas", ei);
            let nota = call("Asignatura", "calificaciones", alumnoAddr, evaluacionIndex)
            let alumnoName = alumnoAddr && call("Asignatura", "datosAlumno", alumnoAddr)?.nombre
            cells.push(
                <tr>
                    <td>
                        {alumnoName}
                    </td>
                    <td>
                        {alumnoAddr}
                    </td>
                    <td key={"p2-" + evaluacionIndex + "-" + ei}>
                        {nota?.tipo === "0" ? "N.P." : ""}
                        {nota?.tipo === "1" ? (nota?.calificacion / 10).toFixed(1) : ""}
                        {nota?.tipo === "2" ? (nota?.calificacion / 10).toFixed(1) + "(M.H.)" : ""}
                    </td>

                </tr>


            )
        }
        return cells;
    });

    return (
        <div>
            <h2>
                Calificaciones para la evaluación E<sub>{evaluacionIndex}</sub>
            </h2>
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Calificación</th>
                </tr>
                {cells}
            </table>
            <Link to="/evaluaciones">Volver</Link>
        </div>)
};

export default EvaluacionCalificaciones;