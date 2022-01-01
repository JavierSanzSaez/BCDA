import {drizzleReactHooks} from '@drizzle/react-plugin'
import {newContextComponents} from "@drizzle/react-components";

const {AccountData} = newContextComponents;
const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function Home() {
    const {drizzle, useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const datos = useCacheCall("Asignatura", "owner");
    const yo = useCacheCall("Asignatura","quienSoy");


    return (
        <div>
            <h2>Página Home de la Asignatura</h2>
            <p>Dirección del usuario owner: {datos}</p>


        </div>


    );
}

export default Home;