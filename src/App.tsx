import { AppRouter } from './routes/AppRouter';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="bottom-right" richColors theme="system" />
    </>
  );
}

export default App;
