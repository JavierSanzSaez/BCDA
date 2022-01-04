import {drizzleReactHooks} from '@drizzle/react-plugin'

const ShowProfesores = () => {
    const { useDrizzle } = drizzleReactHooks;
    
    const { useCacheCall } = useDrizzle();
    let profesoresAddrs = useCacheCall(["Asignatura"], call => {
        let profesoresAddrs = [];
        let profesoresLength = call("Asignatura", "profesoresLength")
        for (let i = 0; i < profesoresLength; i++) {
            let profesorAddr = call("Asignatura", "profesores", i)
            let profesorName = call("Asignatura","getNombreProfesor", profesorAddr)
            profesoresAddrs.push(<p>{profesorName} ({profesorAddr})</p>)
        }
        return profesoresAddrs;
    });

    return (
        <div>
            <h3>Profesores actuales</h3>
            {profesoresAddrs}
        </div>

    )
}

export default ShowProfesores 