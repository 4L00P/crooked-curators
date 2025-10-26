import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App'
import './CSS/style.css'

import {
  ConfigProvider,
} from "./antdComponents";

const app = createRoot(document.getElementById('root'))

app.render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        components:{
          Carousel:{
            arrowSize: 64
          },
          Button:{
            primaryColor: "var(--content)",
          }
        },
        token: {
          // Seed Token
          colorPrimary: "red",
          colorBgLayout: "var(--background)",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "var(--content)",
        },
      }}
    >

      <App />
    </ConfigProvider>
  </BrowserRouter>
);
