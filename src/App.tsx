import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Player from "./Player";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="holder">
      <QueryClientProvider client={queryClient}>
        <Player />
      </QueryClientProvider>
    </div>
  );
}

export default App;
