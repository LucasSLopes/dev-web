# Integração com o Banco de Dados

Para essa aplicação, utilizamos o MySQL como banco de dados. O TypeORM é responsável por criar e manter a integridade das tabelas `usuarios`, `ativos`, `solicitacoes` e `emprestimos` no banco de dados, de acordo com as definições das entidades.

## Entidade `Usuario`

A entidade `Usuario` representa os usuários da aplicação. Ela está mapeada para a tabela `usuarios` no banco de dados.

### Campos:

- `id`: Chave primária autoincrementada que identifica cada usuário.
- `matricula`: Identificação única do usuário, com comprimento máximo de 10 caracteres.
- `nome`: Nome do usuário, com comprimento máximo de 50 caracteres.
- `cpf`: CPF do usuário, único e com comprimento máximo de 20 caracteres.
- `telefone`: Número de telefone do usuário, único e com comprimento máximo de 15 caracteres.
- `email`: Endereço de e-mail do usuário, único e com comprimento máximo de 50 caracteres.
- `permissao`: Enumerador representando a permissão do usuário na aplicação.
- `senha`: Senha do usuário, com comprimento máximo de 255 caracteres.



## Entidade `Ativo`

A entidade `Ativo` representa os ativos da aplicação, como equipamentos ou recursos. Ela está mapeada para a tabela `ativos` no banco de dados.

### Campos:

- `id`: Chave primária autoincrementada que identifica cada ativo.
- `CGR`: Identificação única do ativo, com comprimento máximo de 10 caracteres.
- `equipamento`: Descrição do equipamento, com comprimento máximo de 50 caracteres.
- `descricao`: Descrição detalhada do ativo, com comprimento máximo de 255 caracteres.
- `marca`: Marca do ativo, com comprimento máximo de 50 caracteres.
- `status`: Enumerador representando o status do ativo na aplicação.

## Entidade Emprestimo

A entidade `Emprestimo` representa os dados de um empréstimo dentro do sistema.

### Campos

- `id`: Identificador único do empréstimo.
- `ativo`: ID do ativo envolvido no empréstimo.
- `usuario`: ID do usuário associado ao empréstimo.
- `solicitacao`: Número único associado à solicitação de empréstimo.
- `data_criacao`: Data e hora de criação do registro do empréstimo.
- `data_devolucao`: Data e hora em que o ativo foi devolvido.
- `status_emprestimo` (enum): Status atual do empréstimo.

## Entidade Solicitacao

A entidade `Solicitacao` representa os dados de uma solicitação no sistema.

### Campos

- `id`: Identificador único da solicitação.
- `ativo`: ID do ativo associado à solicitação.
- `usuario`: ID do usuário que realizou a solicitação.
- `descricao`: Descrição da solicitação.
- `dataCriacao`: Data e hora de criação do registro da solicitação.
- `dataSolucao`: Data e hora em que a solicitacao foi solucionada do ativo.
- `statusSolicitacao`: Status atual da solicitação.


