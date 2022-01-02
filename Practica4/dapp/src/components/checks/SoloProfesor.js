import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoloProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const profesorAddr = useCacheCall("Asignatura", "profesor");

    if (profesorAddr === drizzleState.accounts[0]) {
        return <>
        {children}
    </>
    }
    else{
        return null
    }

};

export default SoloProfesor