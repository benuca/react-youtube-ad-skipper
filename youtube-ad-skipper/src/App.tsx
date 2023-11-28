import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Player from "./Player";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>Youtube Embedder/Ad Skipper</h1>
        <Player />
      </QueryClientProvider>
    </>
  );
}

export default App;
