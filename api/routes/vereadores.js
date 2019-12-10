const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const vereador = require('../models/vereador');

router.get('/',(req,res,next) => {
    vereador.find()
    .select("_id nome cnpj gasto valor mes")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            vereador: docs.map(doc => { 
                   return {
                        _id: doc._id,
                        nome: doc.nome,
                        cnpj: doc.cnpj,
                        gasto: doc.gasto,
                        valor: doc.valor,
                        mes: doc.mes,
                        request: {
                               type: 'GET',
                               url: 'http://localhost:3000/vereadores/'    + doc._id 
                        }
                   }; 
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>   {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',(req,res,next) => {
    const Vereador = new vereador({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        cnpj: req.body.cnpj,
        gasto: req.body.gasto,
        valor: req.body.valor,
        mes: req.body.mes
    });
         Vereador.save()
    .then( result => {
            console.log(result);
            res.status(201).json({  
                message: 'Gasto de Vereador adicionado',
                createdVereador:{
                    _id: result._id,
                    nome: result.nome,
                    cnpj: result.cnpj,
                    gasto: result.gasto,
                    valor: result.valor,
                    mes: result.mes,
                    request: {
                           type: 'POST',
                           url: 'http://localhost:3000/vereadores/'    + result._id 
                    }
                }
            });
        })
        .catch(err => {console.log(err)
        res.status(500).json({  
            error: err
        });
        });
});

router.get('/:vereadoresID',(req,res,next) => {
    const id  = req.params.vereadoresID;
        vereador.findById(id)
        .exec()
        .then(doc =>{
            console.log("DataBase",doc);
            if(doc){
            res.status(200).json(doc);
            } else {    
                res.status(404).json({message: "ID invalido"})
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error:err })    
        })
});

router.patch('/:vereadoresID',(req,res,next) => {
    const id = req.params.vereadoresID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propNome] = ops.value;
    }
    vereador.update({_id: id},{set: updateOps})
        .exec()
        .then(result =>{
                console.log(result);
                res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
            error: err    
            });
        }); 
});

router.delete('/:vereadoresID',(req,res,next) => {
    const id = req.params.vereadoresID;
    vereador.remove({_id: id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
        error: err    
        });
    });
});

    module.exports = router;    