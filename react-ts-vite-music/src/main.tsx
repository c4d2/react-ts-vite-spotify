import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
// redux tookit
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1ED760",
              colorTextQuaternary: "gray",
              colorTextTertiary: "gray",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </>
);
