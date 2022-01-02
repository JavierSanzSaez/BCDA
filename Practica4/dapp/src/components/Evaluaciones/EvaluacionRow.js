import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle} = drizzleReactHooks;

const EvaluacionRow = ({evaluacionIndex}) => {
    const {useCacheCall} = useDrizzle();
    console.log(ev)
    const ev = useCacheCall("Asignatura", "evaluaciones", evaluacionIndex);
    console.log(ev)
    return <tr key={"EVA-" + evaluacionIndex}>
            <th>E<sub>{evaluacionIndex}</sub></th>
            <td>{ev?.nombre}</td>
            <td>{ev?.fecha ? (new Date(1000 * ev.fecha)).toLocaleString() : ""}</td>
            <td>{(ev?.puntos / 10).toFixed(1)}</td>
        </tr>;
};

export default EvaluacionRow;
