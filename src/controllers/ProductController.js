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
            const filter = "%" + req.body.filter + "%";
            const result = await knex('Product').where(req.params).andWhereILike("name", filter)
            return res.json(result)
        }catch (error){
            next(error)
        }
    },

    async getOthersProducts(req,res, next){
        try{
            const {user_id, product_id} = req.params
            const result = await knex('Product').where('user_id', user_id).whereNot('product_id', product_id).limit(4)
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
