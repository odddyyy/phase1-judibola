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

            var Pusher = require('pusher');

            var pusher = new Pusher({
                appId: '958794',
                key: 'cf1f6fed1fb547b2cfdb',
                secret: '5a72bbe35853892b3cd1',
                cluster: 'ap1',
                encrypted: true
            });

            pusher.trigger('my-channel', 'my-event',data);

            res.status(201).json(d);
        }).catch(err=>{
            next(err);
        })
    }
}

module.exports=betController;