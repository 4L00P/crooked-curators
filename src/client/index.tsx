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
            arrowSize: 32
          },
          Button:{
            primaryColor: "var(--content)",
          },
          Timeline:{
            tailColor: "var(--lightmauve)",
            // dotBg: "var(--lightmauve)",
          },
        },
        token: {
          colorText: "var(--darkbrown)",
          colorPrimary: "var(--accent)",
          colorBgLayout: "var(--background)",
          borderRadius: 2,
          colorBgContainer: "var(--content)",
        },
      }}
    >

      <App />
    </ConfigProvider>
  </BrowserRouter>
);
