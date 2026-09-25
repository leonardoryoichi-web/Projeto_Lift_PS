import { Routes, Route } from "react-router-dom";
import PedidosList from "./components/PedidosList.jsx";
import PedidoDetalhe from "./components/PedidoDetalhe.jsx";
import "./App.css";

function App() {
  return (
    <div className="pagina">
      <header className="cabecalho">
        <h1>Sistema Lift</h1>
        <p>Consulta de Pedidos</p>
      </header>

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<PedidosList />} />
          <Route path="/pedidos/:id" element={<PedidoDetalhe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;