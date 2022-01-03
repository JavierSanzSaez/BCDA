import { drizzleReactHooks } from '@drizzle/react-plugin'

import { SoloOwner, SoloCoordinador } from "./checks";
import { FormCoordinador, FormCerrarAsignatura } from "./home"


const { useDrizzle } = drizzleReactHooks;

const Home = () => {
    const { useCacheCall } = useDrizzle();

    const cerrada = useCacheCall("Asignatura", "cerrada");

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");

    const renderCoordinador = coordinador !== "0x0000000000000000000000000000000000000000" ?
        "Dirección del coordinador de la Asignatura: " + coordinador + "" :
        "¡No hay coordinador para la asignatura!";

    const statusAsignatura = cerrada?"cerrada":"abierta";
    const statusAsignaturaStyle = {
        true:"status-cerrada",
        false:"status-abierta"
    }

    return (
        <div className="home">
            <h2>Página Home de la Asignatura</h2>
            <p>Dirección del usuario owner: {owner}</p>
            <p>{renderCoordinador}</p>
            <SoloOwner>
                <FormCoordinador />
            </SoloOwner>
            <p>Esta Asignatura está <span id={statusAsignaturaStyle[cerrada]} >{statusAsignatura}</span></p>
            <SoloCoordinador>
                <FormCerrarAsignatura cerrada={cerrada} />
            </SoloCoordinador>
        </div>


    );
}

export default Home;