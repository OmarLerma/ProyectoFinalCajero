const nombrel = document.querySelector('#titulo');
const noCuenta = document.querySelector('#noCuenta');
const saldol = document.querySelector('#saldo');
const cantidad = document.querySelector('#cantidad')
let sdo = 0;

function validaNumericos(){
    var inputtxt = document.getElementById('text'); 
    var valor = inputtxt.value;
    for(i=0;i<valor.length;i++){
        var code=valor.charCodeAt(i);
            if(code<=48 || code>=57){          
              inputtxt.value=""; 
              return;
            }    
      }
     
   }

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
    }else{
        cerrarSesion();
    }
}

function cerrarSesion(){
    localStorage.removeItem("Cuentas");
    window.open('index.html',"_self");
}

function retiro(){
    let cantidad =document.getElementById('cantidad').value;
    if (cantidad === '' || parseFloat(cantidad) < 1 ){
        let mensaje ="Verifique la cantidad a retirar no se permiten cantidades negativas, en 0 o en blanco";
        Swal.fire({
            title: "¡Informacion!",
            text: mensaje
        });
    }else{
        if(parseFloat(sdo) >= 10){
            sdo = parseFloat(sdo) - parseFloat(cantidad) 
            if (sdo < 10){
                sdo = parseFloat(cantidad) + parseFloat(sdo)
                let disponible = sdo - 10
                if (disponible < 10){
                    disponible = 0
                }
                let mensaje ="No puedes tener menos de $10 en esta cuenta, por el momento solo cuentas con: $" + disponible + " para retirar";
                Swal.fire({
                    title: "¡Informacion!",
                    text: mensaje
                });
                document.getElementById('cantidad').value = '';
                document.getElementById('cantidad').focus();
            } else{
            let mensaje ="Transaccion Exitosa, retiro por la cantidad de $"+cantidad;
            Swal.fire({
                title: "¡Informacion!",
                text: mensaje
            });
            afectaStorage();   
        }  
        }
        
    }
}


function deposito(){
    let cantidad =document.getElementById('cantidad').value;
    if (cantidad === '' || parseFloat(cantidad) < 1 ){
        let mensaje ="Verifique la cantidad a depositar no se permiten cantidades negativas, en 0 o en blanco";
        Swal.fire({
            title: "¡Informacion!",
            text: mensaje
        });
    }else{
        if(parseFloat(sdo) <= 990){
            sdo = parseFloat(cantidad) + parseFloat(sdo)
            if (sdo > 990){
                sdo = parseFloat(sdo) - parseFloat(cantidad)
                let disponible = 990 - sdo  
                let mensaje = "No puedes tener mas de $990 en esta cuenta, por el momento solo puede depositar un maximo de $"+ disponible;
                Swal.fire({
                    title: "¡Informacion!",
                    text: mensaje
                });
                document.getElementById('cantidad').value = '';
                document.getElementById('cantidad').focus();
            }else{
                let mensaje ="Transaccion Exitosa, deposito por la cantidad de $"+cantidad;
                Swal.fire({
                    title: "¡Informacion!",
                    text: mensaje
                });
                afectaStorage();   
            } 
        }
        
    } 
}

function afectaStorage(){
    document.getElementById('cantidad').value = ''; 
    document.getElementById('cantidad').focus();       
    saldol.textContent = `$${sdo}`;
    let usuario = JSON.parse(localStorage.getItem("Cuentas"));
    usuario[0].saldo = sdo;
    localStorage.setItem("Cuentas",JSON.stringify(usuario));
}