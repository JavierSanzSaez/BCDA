import { useState } from "react";
import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useEffect } from "react/cjs/react.production.min";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const FormCerrarAsignatura = ({ cerrada }) => {
    console.log(cerrada)
    const { drizzle } = useDrizzle();

    // Obtener el status de la ultima transaccion enviada:
    const { transactionStack, transactions } = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;
 
    const cerrar = (ev) => {
        ev.preventDefault();
        const stackId = drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
        setLastStackID(stackId);
    }

    const abrir = (ev) => {
        ev.preventDefault();
        const stackId = drizzle.contracts.Asignatura.methods.abrir.cacheSend();
        setLastStackID(stackId);
    }

    const toggleSelected = (ev) => {
        !cerrada ? cerrar(ev) : abrir(ev);
    }

    return (<div className="toggleCerrar">
        <h3>Abrir o cerrar la asignatura</h3>
        <button className="toggle-container" onClick={ev => { toggleSelected(ev) }}>
            <div className={`dialog-button`}>
                {cerrada ? "Abrir" : "Cerrar"}
            </div>
        </button>
        <p>{status}</p>
    </div>);
};

export default FormCerrarAsignatura;
