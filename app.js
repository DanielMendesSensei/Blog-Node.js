/* Unidade principal */
const express = require("express");
const app = express();
const door = 8003;
const handlebars = require("express-handlebars");
const Post = require("./models/Post");
const User = require("./models/User");
const { where } = require("sequelize");
const session = require("express-session");


//CONFIG
    //TEMPLATE ENGINE
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            //Permite a gente usar o #each com handlebar para instanciar variáveis dentro do html
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }));

        app.set('view engine', 'handlebars')

    //BODY PARSER
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());

    //SECTIONS
        app.use(session({
            secret: "chaveteste",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } // Defina como true se estiver usando HTTPS
        }));

    //MIDDLEWARES
        
//ROTAS GET
    app.get("/", function(req, res){
        // o findAll retorna um array, logo para mostrar precisa iterar nele
        // o order permite a gente ordenar utilizando filtros do SQL
        Post.findAll({order:[['id','DESC']]}).then((posts)=>{
            res.render("home", {posts: posts});
        });    
    });

    // Rota que redireciona para página de forms de postagem
    app.get("/cad", function(req, res){
        res.render('forms');
    });

    app.get("/deletar/:id", function(req, res){
        //Aqui usamos D do CRUD e podemos passar o where
        Post.destroy({where: {'id': req.params.id}})
        .then(()=>{
            res.send("Postagem Deletada com sucesso!");
        })
        .catch((err)=>{
            res.send("Esta postagem não existe",err)
        });
    });

    app.get("/about", function(req, res){
        res.render('about');
    })

    app.get("/profile", function(req, res){
        if(req.session.login){
            res.send(`Bem-vindo, ${req.session.login}!`);
        }
        else{
            console.log("ERRO GRAVE")
        }
    })

//ROTAS POST
    app.post("/register", function(req, res){
        // Verificar se usuário já existe no banco e se email já foi registrado também
        // User.findAll({
        //     where: {
        //         'user_name:': req.body.register_user_name}
        //     })
        //     .then(() =>{
        //         console.log("Username já existente")
        //     })   
        User.create({
            user_name: req.body.register_user_name,
            e_mail: req.body.register_e_mail,
            password_hash: req.body.register_password_hash
        })
        .then(() => {
            // TEM QUE MEXER AQUI
            // const user_login = req.body.register_user_name
            // req.session.login = user_login;
            res.send("Registro feito com sucesso!")
        })
        .catch((err) => {
            res.send('Erro ao se cadastrar', err);
          })
    });

    // Rota que pega dados da postagem, salva no db e retorna para home
    app.post("/sendpost", function(req, res){
        Post.create({
            title: req.body.title,
            content: req.body.content
        })
        .then(() => {
            res.redirect('/')
            // res.send('Post enviado com sucesso!.');
          })
        .catch((err) => {
            res.send('Erro ao enviar o Post', err);
          });
    });

    // Retornando mensagem ao cliente com json
    /* app.post("/message", function(req, res){
        const mensagem = ;
        res.json({ mensagem: mensagem});
    }); */


// ARQUIVOS ESTÁTICOS (CSS)
app.use(express.static('public'));

//SERVER
app.listen(door, function(){
    console.log(`Servidor está rodando na url http://localhost:${door}`);
})