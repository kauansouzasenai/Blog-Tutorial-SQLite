const bodyParser = require("body-parser");
const express = require("express"); // importa a biblioteca do Express
const sqlite3 = require("sqlite3"); // importa a biblioteca do SQLite3
const session = require("express-session");

const PORT = 8000; // Porta do servidor HTTP

let config = { titulo: "", rodape: "" };

const app = express(); // intancia para uso da Biblioteca express

// Cria uma conexão com o banco de dados
const db = new sqlite3.Database("user.db"); // inatncia para o uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  // Este metodo permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT,
     email TEXT,  celular TEXT, cpf TEXT, rg TEXT)`
  );
});

app.use(
  session({
    secret: "qualquersenha",
    resave: true,
    saveUninitialized: true,
  })
);

// é a variavel interno do nodejs que guarda o caminho absoluto do projeto, no SO
console.log(__dirname);

//aqui sera acrescentado uma rota "/static", para a pasta __DIRNAME + "/static"
//o app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
//Middleware para isto, que neste caso é o express.static, que gerencia rotas estaticas
app.use("/static", express.static(__dirname + "/static"));

//Middleware para processar as requisições do body parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

const index =
  "<a href='/'>Home</a><br><a href='/login'>Login</a><br><a href='/senha'>Senha</a><br><a href='/cadastro'>cadastro</a>";
const Sobre = 'Vc esta na pagina "login" <br><a href="/">Voltar</a>';
const login = 'Vc esta na pagina "senha" <br><a href="/">Voltar</a>';
const cadastro = 'Vc esta na pagina "cadastro" <br><a href="/">Voltar</a>';

/* Método express.get necessita de dois paârametros
na ARROW FUNCTION, o primeiro são os dados do servidor(REQUISITION - 'REQ')
o segundo, são os dados que serão enviados para ao cliente (RESULE - "RES")

*/
app.get("/", (req, res) => {
  console.log("GET /index");

  config = { titulo: "Blog da turma I2HNA - SESI Nova Odessa", roodape: "" };
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000
  res.render("pages/index", config);
});

app.get("/sobre", (req, res) => {
  console.log("GET /sobre");

  config = { titulo: "Blog da turma I2HNA - SESI Nova Odessa", roodape: "" };
  res.render("pages/sobre", config);
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  config = { titulo: "Blog da turma I2HNA - SESI Nova Odessa", roodape: "" };
  res.render("pages/login", config);
});

app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  config = { titulo: "Blog da turma I2HNA - SESI Nova Odessa", roodape: "" };
  res.render("pages/dashboard", config);
});

app.post("/login", (req, res) => {
  console.log("POST /login não implementado");
  const { nome, senha } = req.body;

  // Consultar o usuario no banco de dados
  const query = "SELECT * FROM users WHERE nome = ? AND senha = ?";
  db.get(query, [nome, senha], (err, row) => {
    if (err) throw err;

    // Se usuario valido -> registra a sessão e redireciona para o dasboard
    if (row) {
      req.session.logged = true;
      req.session.nome = nome;
      res.redirect("/dashboard");
    } else {
      res.send("Usuario invalido");
    }
  });
  // res.send("login não implementado");
});

app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  config = { titulo: "Blog da turma I2HNA - SESI Nova Odessa", roodape: "" };
  res.render("pages/cadastro", config);
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.get(query, [], (err, row) => {
    console.log(`GET /usuarios &{JSON.stringify(row)}`);
    res.render("partials/usertable", config);
  });
});

app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(`${JSON.stringify(req.body)}`);
  res.send(cadastro);
});

app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");
  req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);
  const { nome, senha, email, celular, rg, cpf } = req.body;
  // 1 validação de campos

  // 2 verificar se o usuario ja esta cadastrado
  const query =
    "SELECT * FROM users WHERE email = ? OR cpf = ? OR rg = ? OR nome = ?";
  db.get(query, [email, cpf, rg, nome], (err, row) => {
    if (err) throw err;

    if (row) {
      // A variavel 'row' ira retornar os dados do banco de dados
      // executado atraves do SQL, variavel query
      res.send("usuario ja cadastrado, refaça o cadastro");
    } else {
      // 3 Se o usuario nao existe ira efetuar o cadastro
      const insertQuery =
        "INSERT INTO users (nome, senha, email, celular, rg, cpf) VALUES (?, ?, ?, ?, ?, ?)";
      db.run(insertQuery, [nome, senha, email, celular, cpf, rg], (err) => {
        if (err) throw err;
        res.send("Usuario cadastrado, com sucesso");
      });
    }
  });
});

//   res.send(
//     `Bem vindo usuario: ${req.body.nome}, seu email é ${req.body.email}`
//   );
// });

// app.listes() deve ser o ultimo comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}`);
});
