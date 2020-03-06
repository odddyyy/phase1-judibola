const {Bet}=require('../models');
const jwt = require(`jsonwebtoken`);

class betController{
    static makeBet(req,res){
        let {token}=req.headers;
        let data={
            home_name:req.body.home_name,
            away_name:req.body.away_name,
            real_id:req.body.real_id,
            schedule:req.body.schedule,
            winner:req.body.winner
        }
        let decoded=jwt.decode(token,process.env.SECRET_TOKEN || '12345');
        data.userId=decoded.id;
        Bet.create(data).then(function(d){
            res.status(201).json(d);
        }).catch(err=>{
            next(err);
        })
    }
}

module.exports=betController;