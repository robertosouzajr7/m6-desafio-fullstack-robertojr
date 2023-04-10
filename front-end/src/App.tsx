import "./App.css";
import Main from "./pages/Main";
import Dashboard from "./pages/dashboard";
import { MyContactsPage } from "./pages/dashboard/MyContacts";
import { Route, Routes } from "react-router-dom";
import "./style/global";
import GlobalStyle from "./style/global";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contatos" element={<MyContactsPage />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
