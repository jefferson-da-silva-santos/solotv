
<img src="./solotv.png" />

###
###

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code\&pause=1500\&color=F8F9FA\&width=1000\&lines=الرمز+في+مرمى+الكمال+؛+كل+سطر+من+الكود+طلقة+نحو+الهدف+الأسمى.+سوطوف+ليس+مجرد+إطار+عمل,+إنه+فن+الدقة+والبساطة.)](https://git.io/typing-svg)

---

# 🎯 Sotov Framework

> “Dizem que Sotov foi um atirador lendário do deserto.
> Sua precisão era tamanha que até o vento se calava quando ele mirava.
> Hoje, seu nome inspira este framework: **direto, certeiro e sem desperdício de código**.”

O **Sotov** é um framework backend em **Node.js**, **Express** e **Sequelize**, baseado no **padrão Factory** e **Injeção de Dependência**. Feito pra quem valoriza **organização, produtividade e código limpo**, oferecendo uma arquitetura de API completa e modular.

Claro! Aqui está **somente a parte de instalação**, no formato correto e já pronta para colocar no seu README:

---

# 📦 Instalação via NPM

Instale o Solov diretamente do npm:

```bash
npm install solov
```

Ou com Yarn:

```bash
yarn add solov
```

---

### 📋 Dependências Principais

Bibliotecas essenciais:

  * **`express`**: Framework web minimalista para Node.js.
  * **`sequelize`**, **`pg`**, **`pg-hstore`**: ORM robusto e driver para bancos de dados SQL (PostgreSQL).
  * **`dotenv`**: Para carregar variáveis de ambiente (`.env`).
  * **`winston`**: Sistema de logging profissional.
  * **`joi`**: Para validação de schemas de requisição.
  * **`node-cache`**: Solução de cache em memória simples.
  * **`bcrypt`**: Para hashing seguro de senhas.
  * **`jsonwebtoken`**: Para manipulação de tokens JWT.
  * **`cors`** e **`helmet`**: Middlewares de segurança e proteção HTTP.
  * **`express-rate-limit`**: Middleware para limitação de taxa de requisições.
  * **`swagger-jsdoc`** / **`swagger-ui-express`**: Para documentação automática de API (OpenAPI).

### ⚙️ Dependências de Desenvolvimento

Para garantir a qualidade do código, o Sotov utiliza:

  * **`jest`**: Framework para testes unitários e de integração.
  * **`supertest`**: Biblioteca para testar endpoints HTTP de forma fácil.
  * **`nodemon`**: Para recarregamento automático durante o desenvolvimento (`npm run dev`).

### 💻 Rodando o Servidor

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Configure o ambiente:** Crie um arquivo **`.env`** na raiz do projeto com as suas configurações (ex: `PORT`, `DATABASE_URL`, `JWT_SECRET`).
3.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

Por padrão, o servidor inicia na porta definida em `.env` ou **3000**:

> Servidor rodando em `http://localhost:<PORT>`
> ✅ Database connected\!

### 🧪 Rodando os Testes

Para executar os testes de unidade e integração, use o script dedicado. A flag `--runInBand` garante que os testes sejam executados sequencialmente, o que é importante para evitar conflitos de banco de dados:

```bash
npm test
# ou:
npm run test
```

-----

## 📂 Estrutura de Diretórios 🗂️

A estrutura do Sotov é dividida de forma clara, garantindo a **Separação de Preocupações** (SoC) e facilitando a localização de cada componente.

| Diretório | Descrição |
| :--- | :--- |
| **`src/config`** | Configurações do banco de dados (`database.js`) e outros arquivos de configuração. |
| **`src/controllers`** | Recebem as requisições das rotas e interagem com a camada de Serviço. Contém o `GatewayController` para padronização de respostas. |
| **`src/logs`** | Arquivos de log gerados pelo `winston` (`logger.js`). |
| **`src/middlewares`** | Lógica executada antes ou depois do Controller, como autenticação (`auth`), tratamento de erros (`error`) e limitadores de taxa (`limiter`). |
| **`src/migrations`** | Scripts de migração do banco de dados (Sequelize CLI). |
| **`src/models`** | Definição dos Schemas/Models do Sequelize (ex: `User.js`). |
| **`src/repositories`** | Abstração da camada de dados. Contém o `AbstractRepository` com as operações CRUD base. |
| **`src/routes`** | Arquivos que definem os endpoints da API (ex: `users.routes.js`). |
| **`src/seeders`** | Scripts para popular o banco de dados (dados iniciais/teste). |
| **`src/services`** | **Núcleo da lógica de negócio**. Contém `AbstractService` e a lógica específica (ex: `user/LoginUserService.js`). |
| **`src/utils`** | Ferramentas globais (Cache, Constantes, Logger, Validações e `ApiError`). |
| **`test`** | **Diretório dedicado para todos os testes** (Unitários e de Integração). |
| **`app.js`** | Configuração e inicialização do Express, com injeção de dependências. |
| **`index.js`** | Ponto de entrada da aplicação, conexão com DB e inicialização do servidor. |

-----

### 🧠 Princípio da Injeção de Dependência (DI)

Note que a dependência do Repositório é injetada desde a inicialização do app (`index.js`), passando para o `app.js` e, finalmente, para o módulo de rotas e as classes de Serviço. Isso torna a API **modular, testável e flexível**.

```javascript
// index.js
const userRepository = new AbstractRepository(User);
const app = createApp(userRepository); // Injeção de dependência
```

-----

## 🛠️ Guia do Desenvolvedor: Componentes Globais

O framework já oferece utilitários e abstrações prontas para uso em qualquer camada.

### 1\. 🛑 Tratamento de Erros Customizado (`ApiError`)

Utilize o `ApiError` para padronizar as exceções de negócio e controlar o status HTTP retornado ao cliente.

  * **Localização:** `utils/error.js`
  * **Uso:** Simplesmente lance o erro dentro do seu Service com o status e a mensagem desejada. O middleware de erro global (`middlewares/error.js`) se encarrega de capturá-lo e formatar a resposta.

<!-- end list -->

```javascript
// Exemplo em um Service
import { ApiError } from "../../utils/error.js";

async function findUserByEmail(email) {
    const user = await this.repository.getOne({ email });
    if (!user) {
        // Lança um erro com status 401
        throw new ApiError(401, API_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
}
```

### 2\. 📝 Logging Profissional (`logger`)

O logger utiliza **Winston** e está configurado para registrar eventos no **console** (colorido) e em um **arquivo** (`logs/app.log`), com rotação e limite de tamanho.

  * **Localização:** `utils/logger.js`
  * **Uso:** Importe e use em qualquer parte do código.

<!-- end list -->

```javascript
import logger from "../../utils/logger.js";
import { API_MESSAGES } from "../../utils/constant.js";

// Log de informação (sucesso)
logger.info(API_MESSAGES.USER_LOGGED_IN_SUCCESSFULLY);

// Log de erro
logger.error(`Tentativa de login falhou para o email: ${email}`);
```

### 3\. 💾 Cache em Memória (`cache`)

Para operações que não exigem persistência imediata, o `NodeCache` oferece um cache em memória simples com TTL (Time-To-Live).

  * **Localização:** `utils/cache.js`
  * **Configuração:** TTL padrão de **15 minutos** (`stdTTL: 60 * 15`).

<!-- end list -->

```javascript
import { cache } from "../../utils/cache.js";

// Define um valor que expira em 300 segundos (5 minutos)
cache.set("user_list_v1", users, 300); 

// Recupera um valor
const cachedUsers = cache.get("user_list_v1");
```

### 4\. ✅ Validações de Schema (`validations`)

Utilizamos o **Joi** para garantir que os dados de entrada (body, query, params) estejam corretos antes de passar para o Service.

  * **Localização:** `utils/validations.js`
  * **Uso:** O Service base (`AbstractService`) já possui o método `validateInputs` que lança um `ApiError` automaticamente em caso de falha.

<!-- end list -->

```javascript
// services/user/LoginUserService.js
import { schemaUserLogin } from "../../utils/validations.js";

// Dentro do método execute() do Service
this.validateInputs(value, schemaUserLogin);
```

### 5\. 🛡️ Middlewares de Segurança

O framework já possui middlewares cruciais configurados:

  * **`auth` (`middlewares/auth.js`)**: Valida tokens **JWT**. Atribui o payload decodificado a `req.user`. Proteja rotas adicionando `auth` antes do Controller.
  * **`rateLimiter` (`middlewares/limiter.js`)**: Limita a **55 requisições** por IP a cada **15 minutos** para prevenir ataques de força bruta ou abuso.
  * **`error` (`middlewares/error.js`)**: **Middleware global de erros**. Deve ser o último a ser carregado no `app.js`.

-----

## 🧩 O Padrão Factory na Prática (Service/Repository)

O Sotov segue o princípio da simplicidade com propósito:

### **Camada de Repositório (`AbstractRepository.js`)**

  * Define as operações **CRUD** (Create, Read, Update, Delete) genéricas.
  * Todo novo Repositório deve **estender** `AbstractRepository` e injetar seu Model Sequelize via `super(Model)`.

<!-- end list -->

```javascript
// Seu repositório personalizado (Ex: ProductRepository)
import AbstractRepository from "./AbstractRepository.js";
import Product from "../models/Product.js";

export default class ProductRepository extends AbstractRepository {
    constructor() {
        super(Product); // Injeta o Model
    }
    // Adicione queries específicas aqui, se necessário
    async findBySlug(slug) {
        return await this.model.findOne({ where: { slug } });
    }
}
```

### **Camada de Serviço (`AbstractService.js`)**

  * Contém a **Lógica de Negócio** central.
  * Todo novo Service deve **estender** `AbstractService` e, geralmente, injetar o Repositório no construtor.

<!-- end list -->

```javascript
// Seu serviço personalizado (Ex: CreateProductService)
import AbstractService from "../AbstractService.js";

export class CreateProductService extends AbstractService {
    constructor(repository) {
        super(repository); // Injeta o Repositório
    }

    async execute(data) {
        this.validateInputs(data, productSchema); // Validação Joi
        
        const newProduct = await this.repository.create(data);
        return newProduct;
    }
}
```

-----

## 🧭 Como Continuar a Codificação

Para adicionar uma nova funcionalidade (ex: Produtos), siga estes passos em todas as camadas:

1.  **Model/Repository:** Crie o Model (Sequelize) e um `ProductRepository` que estenda `AbstractRepository`.

2.  **Service:** Crie um ou mais Services para a lógica de negócio (ex: `CreateProductService`, `ListProductsService`).

3.  **Controller:** Use o `GatewayController` para envolver seu Service e tratar a requisição/resposta de forma padronizada.

    ```javascript
    // Exemplo em uma nova rota
    router.post('/products', async (req, res, next) => {
        // Repositório é passado do app.js para as rotas e injetado no Service
        const controller = new GatewayController(new CreateProductService(productRepository));
        return await controller.handle(req, res, next);
    });
    ```

4.  **Integração:** Adicione o novo módulo de rotas (ex: `productRoutes`) ao `app.js`:

    ```javascript
    // app.js
    import productRoutes from './routes/products.routes.js';
    // ...
    // É necessário ter a instância de productRepository disponível
    app.use(${BASE_URL}/products, productRoutes(productRepository));
    ```

-----

## 📝 Licença

Licenciado sob **MIT** — use, modifique e distribua sem amarras.

-----

Feito com 💪, precisão de mira e café forte ☕
**Jefferson Dev**
[GitHub](https://github.com/jefferson-da-silva-santos) • [npm](https://www.npmjs.com/package/sotov)
