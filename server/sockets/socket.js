const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on( 'connection' , (client) => {

    //escucha
    client.on( 'siguienteTicket' , (data , callback) =>{

        let siguiente = ticketControl.siguiente();
        console.log('El siguiente Ticket es: ', siguiente);
        callback( siguiente );
    });

    client.on( 'atenderTicket' , (data , callback) => {

        if( !data.escritorio){
            return callback({
                ok : false,
                msg : 'El escritorio es requerido.'
            });
        }
        
        let atenderTicket = ticketControl.atenderTicket( data.escritorio );
        callback( atenderTicket );

        //actualizar ultimos 4 (broadcast) para todos.
        client.broadcast.emit( 'ultimos4' , {

            ultimos4 : ticketControl.getUltimos4Ticket()
        });
        
    });

    //emite
    client.emit( 'estadoActual' , {
        
        actual : ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Ticket()
    });
});