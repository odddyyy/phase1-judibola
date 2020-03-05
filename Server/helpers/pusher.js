const Pusher = require('pusher');

function getPusher(){
    return new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        encrypted: true
    });
}

function test(message){
    let pusher=getPusher();
    pusher.trigger('channel-hehe','event-hehe',{
        message
    })
}

module.exports={test};


