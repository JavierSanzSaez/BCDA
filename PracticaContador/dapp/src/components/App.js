import { drizzleReactHooks } from '@drizzle/react-plugin';

import AppControl from './AppControl';
import AppData from './AppData';
import AppHeader from './AppHeader';
import AppLoading from './AppLoading';

const { useDrizzleState } = drizzleReactHooks;

function App() {
  const initialized = useDrizzleState(state => state.drizzleStatus.initialized);

  if (!initialized) {
    return (<main><h1>⚙ Cargando dapp...</h1></main>);
  }

  return (
    <AppLoading>
      <main className="appCounter">
        <AppHeader />
        <AppData />
        <AppControl />
      </main>
    </AppLoading>

  )
}

export default App;