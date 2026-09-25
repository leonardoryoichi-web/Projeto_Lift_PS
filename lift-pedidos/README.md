# Sistema Lift - Consulta de Pedidos

Desafio técnico do processo seletivo de estágio em desenvolvimento.

Projeto em React + Vite com duas telas: uma lista de pedidos e uma tela de detalhe de cada pedido, consumindo a API do Sistema Lift.

Demo publicada: https://projeto-lift-ps.vercel.app

## Rodando localmente

Precisa ter Node instalado (18+).

cd lift-pedidos
npm install
npm run dev

## Sobre a API

Antes de começar a codar eu testei os endpoints pra entender o formato dos dados. Reparei que o endpoint de Pedidos não retorna o valor do pedido pronto, só id, cliente e data:

{ "id": 1, "cliente": 3, "data": "29-01-2000" }

Pra ter o valor eu precisava cruzar com outros 3 endpoints: Clientes (pra pegar o nome), ItensPedido (pra saber quais produtos e quantidades) e Produtos (pra pegar o preço de cada um). O valor final é a soma de quantidade vezes preço de cada item do pedido.

## Estrutura

- src/api/liftApi.js - as chamadas pra API, centralizadas num lugar só
- src/utils/pedidoUtils.js - a lógica que junta pedido + cliente + itens + produto e calcula os valores
- src/utils/format.js - formatação de moeda e data
- src/components/PedidosList.jsx - tela da lista
- src/components/PedidoDetalhe.jsx - tela de detalhe do pedido
- src/components/EstadoCarregando.jsx e EstadoErro.jsx - componentes de carregando/erro, usados nas duas telas

Separei a lógica de cálculo dos componentes porque assim fica mais fácil de entender e testar cada parte separado. Na tela de lista busco os 4 endpoints ao mesmo tempo com Promise.all, pra não ficar esperando um de cada vez.

## O que daria pra melhorar

- Testes automatizados pras funções de cálculo
- Cache dos dados pra não buscar tudo de novo toda vez que volta pra lista
- Busca/filtro na lista de pedidos