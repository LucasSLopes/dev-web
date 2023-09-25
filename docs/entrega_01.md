# Sistema de Gerenciamento de Estoque

> Entrega #1 do trabalho final da disciplina de **Desenvolvimento de Software para Web** da **Universidade Federal do Ceará**.

- [Descrição da Aplicação](#descri%C3%A7%C3%A3o-da-aplica%C3%A7%C3%A3o)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Papéis de Usuários](#pap%C3%A9is-de-usu%C3%A1rios)

## Descrição da Aplicação

O **Sistema de Gerenciamento de Estoque (SGE)** é uma solução de software desenvolvida para atender às necessidades específicas de empresas e organizações cuja função primordial é adquirir e efetivamente controlar seus estoques.

A necessidade desse sistema emerge da complexidade intrínseca à gestão de estoques, sobretudo em organizações que se dedicam à compra, armazenamento, utilização e reutilização de equipamentos. Além disso, o **SGE** é vital para atender às necessidades de precisão no registro de entradas e saídas, controle de estoque em tempo real, otimização de custos, rastreabilidade de produtos e tomada de decisões baseadas em dados.

O **SGE** aborda e resolve diversos desafios comuns na gestão de estoque em organizações, incluindo o desperdício de recursos financeiros, a ineficiência operacional, além de promover transparência e rastreabilidade.

Em síntese, o **Sistema de Gerenciamento de Estoque** é uma ferramenta essencial para empresas e organizações que necessitam adquirir, controlar e reutilizar equipamentos internamente. Ele assegura eficiência operacional, utilização eficaz de recursos e promove transparência nas operações, criando um ambiente de trabalho organizado e eficaz.

## Principais Funcionalidades

### Casos de uso
Solicitação de Empréstimo de Ativo:  Usuário deve ser capaz de visualizar todos os ativos disponíveis na forma de uma tabela que exibe o tipo do ativo e o modelo. Ao clicar na linha de um ativo um modal será aberto, onde o usuário pode descrever o motivo da solicitação, o período de tempo em que deseja ficar com o ativo e confirmar sua solicitação.

Concessão de Empréstimo de Ativos:  O gestor deve ser capaz de visualizar todas as solicitações de ativos na forma de uma tabela. Ao clicar em uma

solicitação um modal será aberto e deve ser possível ver as informações da solicitação (descrição e tempo de empréstimo). No modal deve ter um campo de texto para o gestor enviar uma mensagem ao solicitante, um botão para aceitar a solicitação e um botão para rejeitar a solicitação.

Uma vez que a solicitação seja aprovada ocorrerá as seguintes mudanças:

O estado do Ativo deve ser atualizado:
-   Status: Alocado
-   Responsável: Solicitante

O estado do Usuário solicitante deve ser atualizado:
-   Ativos: ativo solicitado

### Descrição de atributos
Usuários devem ter os seguintes atributos:
-   Matrícula
-   CPF
-   Nome
-   Email
-   Telefone
-   Senha
-   Tipo de usuário
-   Administrador
-   Gestor de Ativos
-   Solicitante
-   Ativos (sob responsabilidade)
-   Ativo
-   Tempo de Empréstimo

Ativos devem ter os seguintes atributos:
-   Tipo de ativo
	-   Computador
	-   Monitor
	-   Projetor
	-   Etc…
-   Descrição
-   Marca
-   Modelo
-   Ano de fabricação
-   Identificador
-   CGR/FCPC
-   Status
-   Alocado
-   Disponível
-   Defeito
-   Responsável pelo ativo
-   Tempo de empréstimo
-   Histórico de empréstimo
    
### Gerenciamento do sistema
Gerenciamento de Usuários:
-   Cadastrar usuários
-   Atualizar usuário
-   Deletar usuário
    
Gerenciamento de Ativos:
-   Cadastrar ativos
-   Atualizar ativos
-   Deletar ativos

Sistema de login:
-   Matrícula
-   Senha
    


## Papéis de Usuários

### Tabela de acesso
|| Admin | Gestor| Solicitante
|--|--|--|--|
| `Estoque` | Ver, criar, editar e deletar | Ver, criar, editar e deletar| Ver 
| `Solicitações` | Ver, criar, editar e deletar | Ver, criar, editar e deletar | Criar
| `Usuários` | Ver, criar, editar e deletar | Ver |- 

### Descrição de usuários
#### Admin
-   Acesso completo ao sistema. O objetivo desse papel é administrar integralmente a aplicação.
-   Usuários com esse papel podem:
	-   Ver, criar, editar e deletar usuários (edição e deleção são limitados se o usuário alvo for outro Admin)
	-   Ver, criar, editar e deletar itens do estoque
	-   Ver, criar, editar e deletar solicitações

#### Gestor
-   Acesso parcial ao sistema. O objetivo desse papel é gerenciar o estoque e as solicitações.
-   Usuários com esse papel podem:
	-   Ver usuários
	-   Ver, criar, editar e deletar itens do estoque
	-   Ver, criar, editar e deletar solicitações

#### Solicitante
-   Acesso limitado ao sistema. O objetivo desse papel é solicitar itens do estoque para uso.
-   Usuários com esse papel podem:
	-   Ver itens do estoque
	-   Criar solicitações
