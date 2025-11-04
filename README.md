
<img src="./solotv.png" />

--- 
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code\&pause=1500\&color=F8F9FA\&width=1000\&lines=الرمز+في+مرمى+الكمال+؛+كل+سطر+من+الكود+طلقة+نحو+الهدف+الأسمى.+سوطوف+ليس+مجرد+إطار+عمل,+إنه+فن+الدقة+والبساطة.)](https://git.io/typing-svg)

# 🎯 Sotov Framework


> “Dizem que Sotov foi um atirador lendário do deserto.
> Sua precisão era tamanha que até o vento se calava quando ele mirava.
> Hoje, seu nome inspira este framework: direto, certeiro e sem desperdício de código.”

O **Sotov** é um framework backend em **Node.js**, **Express** e **Sequelize**, baseado no **padrão Factory**.
Feito pra quem valoriza **organização, produtividade e código limpo**, sem frescura nem mágica.

---

## 🚀 Instalação

```bash
npm install sotov
```

Ou, para criar um novo projeto (quando o CLI estiver disponível):

```bash
npx sotov create nome-do-projeto
```

---

## ⚙️ Tecnologias

* **Node.js** → Base sólida do servidor.
* **Express** → Controle de rotas e middlewares.
* **Sequelize** → ORM robusto e flexível para bancos relacionais.
* **Arquitetura Factory** → Reuso, consistência e manutenção fácil.

---

## 📂 Estrutura Base

```
src/
├─ app.js
├─ server.js
├─ factory/
│  └─ modelFactory.js
├─ controllers/
│  └─ BaseController.js
├─ services/
│  └─ BaseService.js
├─ models/
│  └─ index.js
```

Tudo organizado, direto ao ponto — como deve ser. 🎯

---

## 🧩 O Padrão Factory na Prática

O **Sotov** segue o princípio da simplicidade com propósito:

* **Factory** → Gera modelos dinâmicos.
* **Service** → Centraliza a lógica de negócio.
* **Controller** → Lida com as rotas e requisições HTTP.

Menos código repetido. Mais clareza. Mais precisão.

---

## 🔧 Exemplo Rápido

### Criando um model com Factory:

```js
import { createModel } from 'sotov/factory/modelFactory.js';
import { sequelize } from './models/index.js';
import { DataTypes } from 'sequelize';

const Usuario = createModel(sequelize, 'Usuario', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
});
```

### Usando o Service e Controller base:

```js
import BaseService from 'sotov/services/BaseService.js';
import BaseController from 'sotov/controllers/BaseController.js';

const usuarioService = new BaseService(Usuario);
const usuarioController = new BaseController(usuarioService);
```

---

## 💻 Rodando o Servidor

```bash
npm run dev
```

Por padrão, o servidor inicia na porta **3000**:

```
Servidor rodando na porta 3000
```

Simples, previsível e funcional — como todo bom backend deve ser. ⚙️

---

## 🧠 Filosofia

> “Código limpo, modular e previsível — sem modinhas.”
> — *Jefferson Dev* 🧠

O **Sotov** nasceu pra quem gosta de **entender o que o código faz**,
não pra quem confia em mágica ou frameworks inchados.

---

## 📝 Licença

Licenciado sob **MIT** — use, modifique e distribua sem amarras.

---

Feito com 💪, precisão de mira e café forte ☕
**Jefferson Dev**
[GitHub](https://github.com/jefferson-da-silva-santos) • [npm](https://www.npmjs.com/package/sotov)

---

Quer que eu adicione uma seção opcional tipo “🌟 Por que usar o Sotov?” (listando vantagens curtas e diretas como “sem dependências inúteis”, “arquitetura pronta pra escalar”, etc)? Isso deixaria o README ainda mais convincente pra devs que o descobrirem.
