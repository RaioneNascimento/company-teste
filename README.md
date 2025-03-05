
# Projeto Fullstack - Teste de Empresa  

Este projeto foi desenvolvido como parte de um teste técnico para uma empresa. Ele consiste em uma aplicação fullstack com separação entre front-end e back-end, incluindo as configurações necessárias para inicializar ambos os servidores localmente.  

## Sumário  

- [Instalação do Front-End](#instalação-do-front-end)  
- [Instalação do Back-End](#instalação-do-back-end)  
- [Configuração do Docker Compose](#configuração-do-docker-compose)  

---
## Requisitos

**Node v18.20.4**

---

## Instalação do Front-End

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/RaioneNascimento/company-teste.git
   cd company-teste/frontend
   ```

2. **Instale as dependências do front-end:**

   Se estiver utilizando `yarn`:

   ```bash
   yarn install
   ```

   Se estiver utilizando `npm`:

   ```bash
   npm i
   ```

3. **Inicie o servidor de desenvolvimento do front-end:**

   Para iniciar o front-end, execute o seguinte comando:

   ```bash
   yarn run dev
   ```

   O front-end estará disponível em [http://localhost:5173](http://localhost:5173).

---

## Instalação do Back-End

1. **Clone o repositório (se ainda não feito):**

   ```bash
   git clone https://github.com/RaioneNascimento/company-teste.git
   cd company-teste/backend
   ```

2. **Instale as dependências do back-end:**

   Se estiver utilizando `yarn`:

   ```bash
   yarn install
   ```

3. **Configuração do ambiente:**

   Crie um arquivo `.env` baseado no arquivo `.env.example` fornecido no diretório do back-end. Adicione as variáveis necessárias para configurar o banco de dados, chaves de API e outros parâmetros.

4. **Inicie o servidor do back-end:**

   Para iniciar a API, execute o seguinte comando:

   ```bash
   yarn start
   ```

   A API estará disponível em [http://localhost:3333](http://localhost:3333).

5. **Acessar a documentação do Swagger:**

   A documentação da API estará disponível em [http://localhost:3333/api](http://localhost:3333/api).

---

## Configuração do Docker Compose

Este projeto usa Docker Compose para configurar e orquestrar os containers para o front-end e back-end.

### Requisitos

- **Docker**: Certifique-se de que o Docker está instalado e configurado em sua máquina.

### Passos para configurar o Docker Compose

1. **Subir os containers:**

   Para iniciar todos os containers com Docker Compose, use o comando na raiz do backend `company-teste/backend`:

   ```bash
   docker-compose up
   ```
2. **Executar migrations:**

   Para rodar as migrations é necessário estar na pasta raiz do backend `company-teste/backend`:
   
   ```bash
   npx prisma migrate dev  
   ```

3. **Acessar a aplicação:**

   - O front-end estará disponível em [http://localhost:5173](http://localhost:5173).
   - O back-end estará disponível em [http://localhost:3333](http://localhost:3333).
   - A documentação da API estará disponível em [http://localhost:3333/api](http://localhost:3333/api).

4. **Parar os containers:**

   Para parar os containers, execute:

   ```bash
   docker-compose down
   ```
