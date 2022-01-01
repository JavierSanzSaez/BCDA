import { useState } from "react";

import { drizzleReactHooks } from '@drizzle/react-plugin'
import { useEffect } from "react/cjs/react.production.min";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const FormCerrarAsignatura = ({ cerrada }) => {
    const { drizzle, useCacheCall } = useDrizzle();

    // Obtener el status de la ultima transaccion enviada:
    const { transactionStack, transactions } = useDrizzleState(drizzleState => ({
        transactionStack: drizzleState.transactionStack,
        transactions: drizzleState.transactions
    }));
    const [lastStackID, setLastStackID] = useState(undefined)
    const txObject = transactions[transactionStack[lastStackID] || 'undefined'];
    const status = txObject?.status;

    const [checkboxState, setCheckboxState] = useState(!{ cerrada })

    const toggleSelected = (ev) => {
            ev.preventDefault();
            const stackId = drizzle.contracts.Asignatura.methods.cerrar.cacheSend();
            setLastStackID(stackId);

            if(status==="correct"){
                setCheckboxState(!checkboxState)
            }   
    }

    return (<div className="toggleCerrar">
        <h3>Abrir o cerrar la asignatura</h3>
        <div className="toggle-container" onClick={ev =>{toggleSelected(ev)}}>
            <div className={`dialog-button ${checkboxState ? "" : "disabled"}`}>
                {checkboxState ? "Abierta" : "Cerrrada"}
            </div>
        </div>
    </div>);
};

export default FormCerrarAsignatura;
