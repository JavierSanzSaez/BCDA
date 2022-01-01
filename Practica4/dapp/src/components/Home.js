import { drizzleReactHooks } from '@drizzle/react-plugin'

import { SoloOwner } from "./checks";
import { FormCoordinador } from "./home"


const { useDrizzle } = drizzleReactHooks;

function Home() {
    const { useCacheCall } = useDrizzle();

    const owner = useCacheCall("Asignatura", "owner");
    const coordinador = useCacheCall("Asignatura", "coordinador");

    const renderCoordinador = Number(coordinador) === "0x0000000000000000000000000000000000000000" ?
        "Dirección del coordinador de la Asignatura: " + coordinador + "" :
        "¡No hay coordinador para la asignatura!"

    return (
        <div>
            <h2>Página Home de la Asignatura</h2>
            <p>Dirección del usuario owner: {owner}</p>
            <p>{renderCoordinador}</p>
            <SoloOwner>
                <FormCoordinador />
            </SoloOwner>

        </div>


    );
}

export default Home;