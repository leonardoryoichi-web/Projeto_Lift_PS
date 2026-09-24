export function calcularValorItem(item, produtosPorId) {
  const produto = produtosPorId.get(item.produto);
  const valorUnitario = produto ? produto.valor : 0;
  return item.quantidade * valorUnitario;
}

export function agruparItensPorPedido(itensPedido) {
  const mapa = new Map();
  for (const item of itensPedido) {
    if (!mapa.has(item.pedido)) {
      mapa.set(item.pedido, []);
    }
    mapa.get(item.pedido).push(item);
  }
  return mapa;
}

export function montarListaPedidos(pedidos, clientes, itensPedido, produtos) {
  const clientesPorId = new Map(clientes.map((c) => [c.id, c]));
  const produtosPorId = new Map(produtos.map((p) => [p.id, p]));
  const itensPorPedido = agruparItensPorPedido(itensPedido);

  return pedidos.map((pedido) => {
    const cliente = clientesPorId.get(pedido.cliente);
    const itensDoPedido = itensPorPedido.get(pedido.id) || [];
    const valorTotal = itensDoPedido.reduce(
      (soma, item) => soma + calcularValorItem(item, produtosPorId),
      0
    );

    return {
      id: pedido.id,
      clienteNome: cliente ? cliente.nome : "Cliente não encontrado",
      data: pedido.data,
      valorTotal,
    };
  });
}

export function montarItensComProduto(itensPedido, produtos) {
  const produtosPorId = new Map(produtos.map((p) => [p.id, p]));

  return itensPedido.map((item) => {
    const produto = produtosPorId.get(item.produto);
    return {
      codigoProduto: item.produto,
      nomeProduto: produto ? produto.nome : "Produto não encontrado",
      quantidade: item.quantidade,
      valorTotalProduto: calcularValorItem(item, produtosPorId),
    };
  });
}

export function calcularValorTotalPedido(itensComProduto) {
  return itensComProduto.reduce((soma, item) => soma + item.valorTotalProduto, 0);
}