const knex = require("../database")
const bcrypt = require ("bcrypt")
const generateJwt = require('../utils/jwt');

module.exports = {
    
    async register(req,res, next){
        try{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            
            await knex("User").insert(req.body);

            return res.status(201).send();
        }catch (error){
            next(error)
        }
    },

    async login(req, res, next){
        try{
            const { email, password } = req.body
            console.log(req.body)

            const user = await knex("User").where({email: email})

            if (!(email && password)) {
                res.status(400).send({error: "É necessário preencher todos campos"});
            }

            if(!user.length){
                res.status(401).json({ error: "Não existe usuários com esse e-mail"})
            }else{
                const isAuthenticated  = bcrypt.compareSync(password, user[0].password) 
                
                if(!isAuthenticated){
                    res.status(401).json({ error: "Senha errada"})
                }else{
                    const token = await generateJwt.generateJwt({user_id: user[0].user_id})
                    res.send({
                        token: token,
                        user_id: user[0].user_id
                    })
                }
            }
        }catch(error){
            next(error)
        }
    },

    async editarPerfil(req,res, next){
        try{
            await knex("User").update(req.body).where(req.params);
            return res.status(201).send();
        }catch (error){
            next(error)
        }
    },

    async lojainfo(req,res, next){
        try{
            const user = await knex('User').where(req.params);
            const {email, password, user_id, ...result} = user[0];
            return res.json(result)
        }catch (error){
            next(error)
        }
    },
    
}