import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/layouts/Loader";
import AppLayout from "./components/layouts/AppLayout";
import { store } from "./store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = lazy(() => import("./pages/Home"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                path=""
                element={
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/get-started"
                element={
                  <Suspense fallback={<Loader />}>
                    <GetStarted />
                  </Suspense>
                }
              />
              <Route
                path="/complete-profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <CompleteProfile />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}
