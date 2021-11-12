const express = require('express')
const app =  express()

const cors = require('cors')

app.use(cors())

require('dotenv').config()

const PORT = process.env.PORT
const UserDB = require('./models/Users')

app.use(express.json()) // --> função que vai rodar o middleware no projeto

app.get('/hello_world', (req, res) => {
    res.send('Testando, vai valer apena') // --> criando uma rota, e returnando com .send() uma messagem que deu certo// o get para mostrar no navegador no localhost na porta definida
})

app.post('/newUsers', (req, res) => {
    const name = req.body.name

    // console.log(teste)
    res.send({name})
})

//rota de criar as os dados(os posts)

app.post('/create_user', async (req, res) => {

    try{
        const { name, email, descripition } = req.body

        const user = await UserDB.create({ name, email, descripition })
      
        //   res.send(user)
        res.send('Criado com sucesso!!!')
      
    }catch(err) {
        res.send(err)
    }
})
// rota de listar os dados

app.get('/list_users', async (req, res) => {
    try{
       const users = await UserDB.find()

       res.send({ users })
        
    }catch(err){
        res.status(400).send(err)
    }
})

//rota de pegar pelo paramentro(id)

app.get('/show_users/:user_id', async (req, res) => {
    try{
        const userId = req.params.user_id
        const user = await UserDB.find({ _id: userId })
        res.send({ user })
    }catch(err){
        res.status(400).send(err)
    }
})

//atualizar os post na rota

app.patch('/update_user/:user_id', async (req, res) => {
    try{
        
        const userId = req.params.user_id

        const { name , email, descripition } = req.body

        const user = await UserDB.findByIdAndUpdate( userId, { name, email, descripition }, { new: true })

        res.send({ user })

    }catch(err){
        res.status(400).send('deu erro' + err)
    }
})

//rota para deletar os post

app.delete('/delete_post/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id

         await UserDB.findByIdAndDelete(postId)

        res.send({message: 'Deletado com sucesso'})

    }catch(err){
        res.status(400).send({messageError: 'Erro! Identificador não encontrado'})
    }
})

app.listen(PORT, () => {
    console.log('server running on port:' + PORT)
}) //listen é para porta do servidor
