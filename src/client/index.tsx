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
          }
        },
        token: {
          // Seed Token
          colorPrimary: "var(--cyan)",
          colorBgLayout: "var(--lightmauve)",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "var(--lightcream)",
        },
      }}
    >

      <App />
    </ConfigProvider>
  </BrowserRouter>
);
