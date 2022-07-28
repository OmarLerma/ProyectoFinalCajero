const nombrel = document.querySelector('#titulo');
const noCuenta = document.querySelector('#noCuenta');
const saldol = document.querySelector('#saldo');
const cantidad = document.querySelector('#cantidad')
let sdo = 0;


function cargaCuentas(){
    if(localStorage.getItem("Cuentas")){             
       let usuario = JSON.parse(localStorage.getItem("Cuentas"));
       console.log(usuario[0])
       let nombre2 =  usuario[0].nombre;
       let cuenta = usuario[0].noCuenta;
       let saldo = usuario[0].saldo;
       nombrel.textContent = `Bienvenido: ${nombre2}`;
       noCuenta.textContent =`${cuenta}`; 
       saldol.textContent = `$${saldo}`; 
       sdo = parseFloat(saldo);

       
        // var cuentas = usuario[0].cuentas;
        // console.log(cuentas[0])
        // // let cuenta = JSON.parse(cuentas);
        // for(let i =0; cuentas.length > i ; i++){

        //     let dv = document.createElement("dv");
        //     let texto = document.createTextNode(cuentas[i].noCuenta);
        //     let texto2 = document.createTextNode(cuentas[i].saldo);
        //     dv.appendChild(dv);
        //     texto.appendChild("Cuenta: \t" + texto);
        //     texto2.appendChild("Cuenta: \t" + texto2)
        // }
    //    alert(cuenta.length)
    //    alert(cuenta); 
    //    var cta = JSON.parse(cuenta);
    //    alert(cta[0]);     
    //     for(var i = 0; i < localStorage.length; i++) {   
    //         console.log(localStorage.key(i));
    //       }

    }else{
        cerrarSesion();
    }
}

function cerrarSesion(){
    localStorage.clear;
    window.open('index.html',"_self")

}

function retiro(){
    let cantidad =document.getElementById('cantidad').value;
    if(parseFloat(sdo) >= 10){
        sdo = parseFloat(sdo) - parseFloat(cantidad) 
        if (sdo < 10){
            sdo = parseFloat(cantidad) + parseFloat(sdo)
            let disponible = sdo - 10
            if (disponible < 10){
                disponible = 0
            }
            alert("No puedes tener menos de $10 en esta cuenta, por el momento solo cuentas con: $" + disponible + " para retirar")
        }      
        
    }
    afectaStorage();       
}


function deposito(){
    let cantidad =document.getElementById('cantidad').value;
    if(parseFloat(sdo) <= 990){
        sdo = parseFloat(cantidad) + parseFloat(sdo)
        if (sdo > 990){
            sdo = parseFloat(sdo) - parseFloat(cantidad)
            let disponible = 990 - sdo                     
            alert("No puedes tener mas de $990 en esta cuenta, por el momento solo puede depositar un maximo de $"+ disponible) 
        }
    }
    saldol.textContent = `$${sdo}`;
    afectaStorage();
}

function afectaStorage(){
    document.getElementById('cantidad').value = '';        
    saldol.textContent = `$${sdo}`;
    let usuario = JSON.parse(localStorage.getItem("Cuentas"));
    usuario[0].saldo = sdo;
    localStorage.setItem("Cuentas",JSON.stringify(usuario));
}