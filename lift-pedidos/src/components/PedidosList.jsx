import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPedidos, getClientes, getItensPedido, getProdutos } from "../api/liftApi.js";
import { montarListaPedidos } from "../utils/pedidoUtils.js";
import { formatarMoeda, formatarData } from "../utils/format.js";
import EstadoCarregando from "./EstadoCarregando.jsx";
import EstadoErro from "./EstadoErro.jsx";

function PedidosList() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ativo = true;

    async function carregarPedidos() {
      setCarregando(true);
      setErro(null);
      try {
        const [pedidosApi, clientesApi, itensPedidoApi, produtosApi] =
          await Promise.all([
            getPedidos(),
            getClientes(),
            getItensPedido(),
            getProdutos(),
          ]);

        const listaMontada = montarListaPedidos(
          pedidosApi,
          clientesApi,
          itensPedidoApi,
          produtosApi
        );

        if (ativo) setPedidos(listaMontada);
      } catch (erroCapturado) {
        if (ativo) setErro(erroCapturado.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarPedidos();
    return () => { ativo = false; };
  }, []);

  if (carregando) return <EstadoCarregando texto="Carregando pedidos..." />;
  if (erro) return <EstadoErro mensagem={erro} />;

  return (
    <section>
      <h2>Lista de Pedidos</h2>
      <table className="tabela">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr
              key={pedido.id}
              className="linha-clicavel"
              onClick={() => navigate(`/pedidos/${pedido.id}`)}
            >
              <td>{pedido.id}</td>
              <td>{pedido.clienteNome}</td>
              <td>{formatarData(pedido.data)}</td>
              <td>{formatarMoeda(pedido.valorTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PedidosList;