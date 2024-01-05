📝📝 Bem vindo ao Teste-Tecnico-Pleno-FS 📝📝

Desafio Técnico: Sistema de Confirmação de Chegada e Atribuição de Pedidos

⚙️ Esse desafio consiste em uma aplicação web utilizando React para o frontend, React Native para o aplicativo de entregadores, e Node.js para o backend. O sistema deve permitir a notificação do estabelecimento da chegada do entregador, a confirmação da chegada pelo estabelecimento, o cadastro de pedidos pelo estabelecimento após a confirmação, e a visualização da lista de pedidos pelo entregador. Esse desafio foi desenvolvido num período curto, com suas principais funcionalidades em aproximadamente 4 dias - tempo máximpo para a realização.

## Funcionalidades

### Autenticação e cadastro

Você pode criar uma conta nova ou autenticar-se.

### Dashboard

No Dashboard, como administrador, você terá acesso à lista de notificações, feitas pelo delivery, em que o repositório se encontra aqui [https://github.com/ismaelrodino2/Teste-Tecnico-Pleno-FS-mobile]. Essas notificações são atualizadas em tempo real, assim como todas outras funcionalidades, através do pusher. Você também, nesta tela, pode desconectar de sua conta. Clicando no botão de uma notificação, você será redirecionado para um formulário. Nele você precisa preencher as informações da entrega e confirmar. No mesmo momento, o delivery receberá essas informações em sua tela.

## Configuração Inicial

Antes de iniciar o desenvolvimento, siga esses passos:

1. Abra o arquivo `.env` e defina as variáveis, seguindo .env.example. No caso do ambiente de desenvolvimento, NODE_ENV será "development"

## Iniciando o Projeto

Para iniciar o projeto no frontend, siga as instruções abaixo:

1. Instale as dependências:

```#!/bin/sh
pnpm i
```

2. Inicie o projeto (no celular ou no computador):

```#!/bin/sh
pnpm dev
```

## Testando o projeto

Para testar algumas funcionalidades, apenas rode:

```#!/bin/sh
pnpm test
```
