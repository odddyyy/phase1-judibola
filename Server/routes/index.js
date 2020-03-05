const router=require('express').Router();
const userRoute = require(`../routes/userRouter`)
const {test}=require('../helpers/pusher');


router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/pusher',(req,res)=>{
    test(req.query.message);

    res.send('Pusher triggered');

})

router.use(`/user`, userRoute)

module.exports=router;