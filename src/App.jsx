
import React from "react";
import AuthPage from "Pages/AuthPage";
import { BrowserRouter } from "react-router-dom";

import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "configs/reactQueryCongig";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "Vazir, sans-serif",
              direction: "rtl",
              borderRadius: "10px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#a62626",
                color: "#fff",
              },
            },
          }}
        />

        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
