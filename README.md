# 🚗 Sistema de Gestão para Oficina Mecânica

Um sistema web para gerenciamento de ordens de serviço, faturamento e controle de serviços de uma oficina mecânica.

---

## 🌐 Acesse o Sistema Online

O sistema está disponível online no seguinte link:

🔗 [mecanica-inazuma.netlify.app](https://mecanica-inazuma.netlify.app/)

⚠️ **Atenção:** Os botões de cadastro e edição estão desativados para evitar um excesso de dados no banco de dados Firebase.

🔑 **Credenciais de acesso ao sistema:**

- **Email:** [admin@admin.com](mailto\:admin@admin.com)
- **Senha:** admin123

---

## ✨ Funcionalidades

✅ Dashboard financeiro interativo 📊\
✅ Gerenciamento de ordens de serviço 📄\
✅ Relatórios de faturamento e serviços mais lucrativos 💰\
✅ Integração com Firebase para armazenamento de dados 🔥\
✅ Interface moderna e responsiva 🖥️📱

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**

- React.js ⚛️
- React ApexCharts 📊 (Gráficos interativos)
- Bootstrap 🎨 (Estilização)
- MUI (@mui/material) 🎨 (Componentes estilizados)

### **Back-end / Banco de Dados**

- Firebase Firestore 🔥 (Banco de dados em tempo real)

---

## 🚀 Como Executar o Projeto

### 🔹 Passo 1:  Clonar o repositório

```sh
git clone https://github.com/VitorAugusto966/Sistema-de-Gerenciamento-Mecanica.git  
cd nome-do-repositorio  
```

### 🔹 Passo 2: Instalar as dependências

```sh
npm install  
```

### 🔹 Passo 3: Configurar o Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Vá até "Configurações do Projeto" > "Configuração do Firebase SDK" e copie suas credenciais.
3. Crie um arquivo **firebaseConnection.js** na pasta `src/` e adicione:

```js
import { initializeApp } from "firebase/app";  
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {  
    apiKey: "SUA_API_KEY",  
    authDomain: "SEU_AUTH_DOMAIN",  
    projectId: "SEU_PROJECT_ID",  
    storageBucket: "SEU_STORAGE_BUCKET",  
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",  
    appId: "SEU_APP_ID"  
};  

const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);  

export { db };  
```

### 🔹 Passo 4: Iniciar o servidor

```sh
npm start  
```

O projeto será iniciado em [**http://localhost:3000/**](http://localhost:3000/) 🚀

---

## 📚 Estrutura do Projeto

```
📺 src
 ┣ 📂 assets/         # Imagens e ícones  
 ┣ 📂 components/     # Componentes reutilizáveis  
 ┣ 📂 pages/          # Páginas do sistema  
 ┣ 📄 App.js          # Arquivo principal do React  
 ┣ 📄 firebaseConnection.js # Configuração do Firebase  
 ┗ 📄 index.js        # Entrada do projeto  
```



