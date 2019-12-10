const  express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'Gasto Selecionado'
    });
});

router.post('/',(req,res,next) => {
    const gasto = {
        gastoID: req.body.gastoID,
        valor: req.body.valor
    };
    res.status(201).json({
        message: 'Gasto adicionado'
    });
});

router.get('/:gastoID',(req,res,next) => {
    res.status(200).json({
        message: 'Detalhe do gasto',
        gastoId: req.params.gastoId
    });
});

router.delete('/:gastoID',(req,res,next) => {
    res.status(200).json({
        message: 'Gasto deletado',
        gastoId: req.params.gastoId
    });
});



router.patch('/:vereadoresID',(req,res,next) => {
    res.status(200).json({
        message: 'Update Vereador'
        });
});


router.delete('/:vereadoresID',(req,res,next) => {
    res.status(200).json({
        message: 'Deletou Vereador'
        });
});

    module.exports = router; 