import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPedidoPorId,
  getClientePorId,
  getItensDoPedido,
  getProdutoPorId,
} from "../api/liftApi.js";
import { montarItensComProduto, calcularValorTotalPedido } from "../utils/pedidoUtils.js";
import { formatarMoeda, formatarData } from "../utils/format.js";
import EstadoCarregando from "./EstadoCarregando.jsx";
import EstadoErro from "./EstadoErro.jsx";

function PedidoDetalhe() {
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function carregarDetalhe() {
      setCarregando(true);
      setErro(null);
      try {
        const pedidoApi = await getPedidoPorId(id);

        const [clienteApi, itensPedidoApi] = await Promise.all([
          getClientePorId(pedidoApi.cliente),
          getItensDoPedido(id),
        ]);

        const idsDeProdutoUnicos = [...new Set(itensPedidoApi.map((item) => item.produto))];
        const produtosApi = await Promise.all(
          idsDeProdutoUnicos.map((idProduto) => getProdutoPorId(idProduto))
        );

        const itensMontados = montarItensComProduto(itensPedidoApi, produtosApi);

        if (ativo) {
          setPedido(pedidoApi);
          setCliente(clienteApi);
          setItens(itensMontados);
        }
      } catch (erroCapturado) {
        if (ativo) setErro(erroCapturado.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDetalhe();
    return () => { ativo = false; };
  }, [id]);

  if (carregando) return <EstadoCarregando texto="Carregando informações do pedido..." />;
  if (erro) return <EstadoErro mensagem={erro} />;

  const valorTotalPedido = calcularValorTotalPedido(itens);

  return (
    <section>
      <Link to="/" className="link-voltar">&larr; Voltar para a lista de pedidos</Link>

      <div className="topo-detalhe">
        <h2>Informações do Pedido</h2>
        <span className="id-pedido">#{pedido.id}</span>
      </div>

      <div className="caixa">
        <h3>Dados do Cliente</h3>
        <div className="linha-dados">
          <span><strong>Nome:</strong> {cliente.nome}</span>
          <span><strong>CPF:</strong> {cliente.cpf}</span>
          <span><strong>Data:</strong> {formatarData(pedido.data)}</span>
        </div>
        <div className="linha-dados">
          <span><strong>E-mail:</strong> {cliente.email}</span>
        </div>
      </div>

      <h3>Itens do Pedido</h3>
      <table className="tabela">
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.codigoProduto}>
              <td>{item.codigoProduto}</td>
              <td>{item.nomeProduto}</td>
              <td>{item.quantidade}</td>
              <td>{formatarMoeda(item.valorTotalProduto)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="total-pedido">
        Total: <strong>{formatarMoeda(valorTotalPedido)}</strong>
      </p>
    </section>
  );
}

export default PedidoDetalhe;