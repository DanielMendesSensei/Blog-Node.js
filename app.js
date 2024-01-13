/* Unidade principal */
const express = require("express");
const app = express();
const door = 8003;
const handlebars = require("express-handlebars");
const Post = require("./models/Post");
const { where } = require("sequelize");


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
    //Aqui é um middleware
        app.use(express.urlencoded({extended: false}))
        app.use(express.json())

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

//ROTAS POST
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

        // let title = req.body.title;
        // let content = req.body.content;
        // res.send(`Formulario Enviado, dados ${title} e ${content}`)
    });

   /*  app.get("/sobre", function(req, res){
        res.send("Seja bem-vindo ao meu app!");
    });

    app.get("/blog", function(req, res){
        res.send("Seja bem-vindo ao meu app!");
    }); */

// ARQUIVOS ESTÁTICOS (CSS)
app.use(express.static('public'));

//SERVER
app.listen(door, function(){
    console.log(`Servidor está rodando na url http://localhost:${door}`);
})