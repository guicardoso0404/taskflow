# 🚀 TaskFlow - Gerenciador de Tarefas

Sistema web desenvolvido com **Java + Spring Boot** para gerenciamento de tarefas, permitindo criar, listar, atualizar e filtrar tarefas por status.

---

## 📌 Sobre o Projeto

O **TaskFlow** é uma API REST que permite organizar tarefas de forma simples e eficiente, sendo ideal para estudos e uso como projeto de portfólio.

---

## 🛠️ Tecnologias Utilizadas

- Java 21+
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Lombok

---

## ⚙️ Funcionalidades

✔️ Criar tarefas  
✔️ Listar todas as tarefas  
✔️ Buscar tarefa por ID  
✔️ Atualizar tarefa  
✔️ Deletar tarefa  
✔️ Filtrar tarefas por status  

---

## 📂 Estrutura do Projeto

src/
 └── main/
     ├── java/com/gui/taskflow/
     │   ├── controller/
     │   ├── service/
     │   ├── repository/
     │   ├── entity/
     │   └── TaskflowApplication.java
     └── resources/
         ├── application.properties

---

## 🗄️ Modelo da Entidade

### Tarefa

- id (Long)
- titulo (String)
- descricao (String)
- status (Enum)
- dataCriacao (LocalDateTime)

### StatusTarefa (Enum)

- PENDENTE
- EM_ANDAMENTO
- CONCLUIDA

---

## 🔌 Endpoints da API

### ➕ Criar tarefa
POST /tarefas

### 📋 Listar todas
GET /tarefas

### 🔍 Buscar por ID
GET /tarefas/{id}

### 🔄 Atualizar
PUT /tarefas/{id}

### ❌ Deletar
DELETE /tarefas/{id}

### 📊 Filtrar por status
GET /tarefas/status/{status}

---

## 🧪 Exemplo JSON

{
  "titulo": "Estudar Spring Boot",
  "descricao": "Aprender API REST",
  "status": "PENDENTE"
}

---

## 🗃️ Banco de Dados

### Criar banco no MySQL

CREATE DATABASE taskflow;

### Configuração (application.properties)

spring.datasource.url=jdbc:mysql://localhost:3306/taskflow
spring.datasource.username=root
spring.datasource.password=senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

---

## ▶️ Como Executar

1. Clonar o repositório:
git clone https://github.com/seu-usuario/taskflow.git

2. Entrar na pasta:
cd taskflow

3. Rodar o projeto:
mvn spring-boot:run

4. A API estará disponível em:
http://localhost:8080

---

## 💡 Possíveis Melhorias

- Autenticação com JWT
- Frontend com React
- Paginação de tarefas
- Upload de anexos
- Dashboard com gráficos

---

## 👨‍💻 Autor

Guilherme Cardoso  
Desenvolvedor Full Stack  
Portfólio: https://portif-lio-drab-ten.vercel.app  

---

## 📄 Licença

Este projeto é livre para uso e modificação para fins de estudo.
