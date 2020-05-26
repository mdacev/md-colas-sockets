const fs = require('fs');

class Ticket {

    constructor(numero , escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4Tickets = [];

        //importo data.json
        let data = require('../data/data.json');
        
        if( data.hoy === this.hoy){
             this.ultimo = data.ultimo;
             this.tickets = data.tickets;
             this.ultimos4Tickets = data.ultimos4Tickets;
        }
        else{

            this.reiniciarConteo();
        }

    }



    getUltimoTicket(){
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4Ticket(){
        return this.ultimos4Tickets;
    }

    atenderTicket( escritorio ){

        if( this.tickets.length === 0){
            return 'No hay Tickets pendientes.';
        }
        //obtengo el primer numero de el array y lo elimino.
        let numeroTicket = this.tickets[0].numero;
        //Borra el 1ro
        this.tickets.shift();

        let atenderTicket = new Ticket( numeroTicket , escritorio );
        //Agrega al principio
        this.ultimos4Tickets.unshift( atenderTicket );

        if(this.ultimos4Tickets.length > 4){
            //Borra el ultimo
            this.ultimos4Tickets.splice(-1 , 1);

        }
        
        this.grabarArchivo();

        return atenderTicket;
        
    }

    reiniciarConteo(){

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4Tickets = [];
        console.log('Se reinicio el sistema de colas.');
        this.grabarArchivo();
    }

    siguiente(){

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo , null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    grabarArchivo(){

        let dataJson = {
            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets : this.tickets,
            ultimos4Tickets : this.ultimos4Tickets
        };

        let dataJsonString = JSON.stringify(dataJson);

        fs.writeFileSync('./server/data/data.json' , dataJsonString);
    }
}

module.exports = {
    TicketControl
}