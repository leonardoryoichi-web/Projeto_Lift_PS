const BASE_URL = "https://sistemalift1.com.br/lift_ps/api";


async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`A API respondeu com erro ${response.status} para ${path}.`);
  }

  return response.json();
}

export function getPedidos() {
  return request("/Pedidos");
}

export function getClientePorId(id) {
  return request(`/Clientes/${id}`);
}

// ---- Clientes ----------------------------------------------------------
export function getClientes() {
  return request("/Clientes");
}

// (getClientePorId você já tem)

// ---- Pedidos ------------------------------------------------------------
// (getPedidos você já tem)

export function getPedidoPorId(id) {
  return request(`/Pedidos/${id}`);
}

// ---- Produtos -------------------------------------------------------------
export function getProdutos() {
  return request("/Produtos");
}

export function getProdutoPorId(id) {
  return request(`/Produtos/${id}`);
}

// ---- Itens de pedido ------------------------------------------------------
export function getItensPedido() {
  return request("/ItensPedido");
}

export function getItensDoPedido(idPedido) {
  return request(`/ItensPedido/${idPedido}`);
}