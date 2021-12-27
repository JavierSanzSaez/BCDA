import { DrizzleContext } from '@drizzle/react-plugin';

import AppControl from './AppControl';
import AppData from './AppData';
import AppHeader from './AppHeader';

function App() {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          return (<main><h1>⚙ Cargando dapp...</h1></main>);
        }
        return (
          <div className="appCounter">
            <AppHeader />
            <AppData drizzle={drizzle} drizzleState={drizzleState} />
            <AppControl drizzle={drizzle} drizzleState={drizzleState} />
          </div>
        )
      }}
    </DrizzleContext.Consumer>
  );
}

export default App;