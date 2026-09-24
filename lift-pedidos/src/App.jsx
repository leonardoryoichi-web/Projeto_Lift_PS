import { Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<p>Lista de pedidos vai aqui</p>} />
          <Route path="/pedidos/:id" element={<p>Detalhe do pedido vai aqui</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;