import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoloCoordinador = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const profesorAddr = useCacheCall("Asignatura", "coordinador");

    if (profesorAddr !== drizzleState.accounts[0]) {
        return <p>NO SOY EL COORDINADOR</p>
    }
    return <>
        {children}
    </>

};

export default SoloCoordinador