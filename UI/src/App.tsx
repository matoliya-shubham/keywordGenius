import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./components/router/AppRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
