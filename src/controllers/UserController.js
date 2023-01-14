const knex = require("../database")
const bcrypt = require ("bcrypt")
const generateJwt = require('../utils/jwt');
const { get } = require("../routes");

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
                        user_id: user[0].user_id,
                        color: user[0].color
                    })
                }
            }
        }catch(error){
            next(error)
        }
    },

    async editarPerfil(req,res, next){
        try{
            console.log(req.body)
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

    async validateEmail(req,res, next){
        try{
            const { email } = req.body
            const getEmail = await knex("User").where({email: email})
            const isNewEmail = getEmail.length ? true : false;
            console.log(getEmail)
            res.status(200).send(isNewEmail);
        }catch (error){
            next(error)
        }
    },
    
}