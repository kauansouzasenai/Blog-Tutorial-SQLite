const express = require("express");
const sqlite3 = require("sqlite3");

const PORT = 8000;

const app = express();

const db = new sqlite3.Database("user.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

const index =
  "<a href='/'>Home</a><br><a href='/login'>Login</a><br><a href='/senha'>Senha</a><br><a href='/cadastro'>Cadastro</a>";
const Sobre = 'Vc esta na pagina "login" <br><a href="/">Voltar</a>';
const Login = 'Vc esta na pagina "senha" <br><a href="/">Voltar</a>';
const Cadastro = 'Vc esta na pagina "cadastro" <br><a href="/">Voltar</a>';

/* Método express.get necessita de dois paârametros
na ARROW FUNCTION, o primeiro são os dados do servidor(REQUISITION - 'REQ')
o segundo, são os dados que serão enviador para ao cliente (RESULE - "RES")

*/
app.get("/", (req, res) => {
  res.send(index);
});

app.get("/login", (req, res) => {
  res.send(Sobre);
});

app.get("/senha", (req, res) => {
  res.send(Login);
});
app.get("/cadastro", (req, res) => {
  res.send(Cadastro);
});

// app.listes() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
