import {drizzleReactHooks} from '@drizzle/react-plugin'

import EvaluacionesHead from "./EvaluacionesHead";
import EvaluacionesBody from "./EvaluacionesBody";

const {useDrizzle} = drizzleReactHooks;

const Evaluaciones = () => {
    const {useCacheCall} = useDrizzle();

    const el = useCacheCall("Asignatura", "evaluacionesLength");

    return (
        <section className="AppEvaluaciones">
            <h2>Evaluaciones</h2>
            <table>
                <EvaluacionesHead/>
                <EvaluacionesBody evaluacionesLength={el ?? 0}/>
            </table>
        </section>
    );
};

export default Evaluaciones;
