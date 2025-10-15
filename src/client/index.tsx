import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
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
        token: {
          // Seed Token
          colorPrimary: "#058f6fff",
          colorBgLayout: "#e0b5c2",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f8f4e5",
        },
      }}
    >

      <App />
    </ConfigProvider>
  </BrowserRouter>
);
