const knex = require("../database")

module.exports = {
    

    async addProduct(req,res, next){
        try{
            await knex("Product").insert(req.body)
            return res.status(201).send()
        }catch (error){
            next(error)
        }
    },

    async editProduct(req,res, next){
        try{
            await knex("Product").update(req.body).where(req.params)
            return res.json()
        }catch (error){
            next(error)
        }
    },
    
    async getProduct(req,res, next){
        try{
            const result = await knex('Product').where(req.params);
            return res.json(result)
        }catch (error){
            next(error)
        }
    },

    async getAllProducts(req,res, next){
        try{
            const result = await knex('Product').where(req.params)
            return res.json(result)
        }catch (error){
            next(error)
        }
    },

    async deleteProduct(req,res, next){
        try{
            await knex("Product").where(req.params).delete()
            return res.json()
        }catch (error){
            next(error)
        }
    },
}
