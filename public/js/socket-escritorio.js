var socket = io();

var searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has( 'escritorio') ){
    window.location = "index.html";
    throw new Error ('No hay Escritorio disponible.')
}

var escritorio = searchParams.get( 'escritorio');
var label = $('small');

$('h1').text( 'Escritorio ' + escritorio);

$('button').on( 'click' , function() {

    socket.emit( 'atenderTicket' , { escritorio: escritorio} , function( resp ){

        console.log(resp);
        if( resp === 'No hay Tickets pendientes.'){
            alert( resp );
            label.text( resp );
            return;
        }

        label.text('Ticket ' + resp.numero);
    });
});