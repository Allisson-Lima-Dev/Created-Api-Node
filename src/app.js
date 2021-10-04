const express = require('express')
const app =  express()

const cors = require('cors')

app.use(cors())

require('dotenv').config()

const PORT = process.env.PORT

const Post = require('./models/Posts')

app.use(express.json()) // --> função que vai rodar o middleware no projeto

app.get('/hello_world', (req, res) => {
    res.send('Testando, vai valer apena') // --> criando uma rota, e returnando com .send() uma messagem que deu certo// o get para mostrar no navegador no localhost na porta definida
})

app.post('/newUsers', (req, res) => {
    const name = req.body.name

    // console.log(teste)
    res.send(`Nome : ${name}`)
})

//rota de criar as os dados(os posts)

app.post('/create_post', async (req, res) => {

    try{
        const { title, content } = req.body

        const post = await Post.create({ title, content })
      
          res.send(post)
      
    }catch(err) {
        res.send(err)
    }
})
// rota de listar os dados

app.get('/list_posts', async (req, res) => {
    try{
       const posts = await Post.find()

       res.send({ posts })
        
    }catch(err){
        res.status(400).send(err)
    }
})

//rota de pegar pelo paramentro(id)

app.get('/show_posts/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id
        const post = await Post.find({ _id: postId })
        res.send({ post })
    }catch(err){
        res.status(400).send(err)
    }
})

//atualizar os post na rota

app.patch('/update_post/:post_id', async (req, res) => {
    try{
        
        const postId = req.params.post_id

        const { title , content } = req.body

        const post = await Post.findByIdAndUpdate( postId, { title, content }, { new: true })

        res.send({post})

    }catch(err){
        res.status(400).send(err)
    }
})

//rota para deletar os post

app.delete('/delete_post/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id

         await Post.findByIdAndDelete(postId)

        res.send({message: 'Deletado com sucesso'})

    }catch(err){
        res.status(400).send({messageError: 'Erro! Identificador não encontrado'})
    }
})

app.listen(PORT, () => {
    console.log('server running on port:' + PORT)
}) //listen é para porta do servidor
