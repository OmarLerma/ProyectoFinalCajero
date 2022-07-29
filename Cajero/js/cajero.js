const asistente =[
    {
        nombre: 'Andres',
        correo: 'andres@correo.com',
        pass: '1234',
        noCuenta: 10000,
        saldo: 100
    },
    {
        nombre: 'Pedro',
        correo: 'pedro@correo.com',
        pass: '1234',
        noCuenta: 10010,
        saldo: 100            
    },
    {
        nombre: 'Jose',
        correo: 'Jose@correo.com',
        pass: '1234',
        noCuenta: 10020,
        saldo: 100          
        
    }
]


function addItems(key,item){
    if(typeof item == 'string'){
        localStorage.setItem(key,item) 
    }else{
        localStorage.setItem(key,JSON.stringify(item))
    }
}

function eventos(){
    document.getSelection('#usu').keypress(function(event) {
        if (event.keyCode === 13) {
            document.getElementById('passw').focus();
        }
    });
    document.getElementById('passw').keypress(function(event) {
        if (event.keyCode === 13) {
            inicio();
        }
    });
}


function inicio(){     
    const email = document.getElementById('usu').value;
    const contra = document.getElementById('passw').value;
    let user = JSON.stringify (asistente.filter((asistente)=> asistente.correo === email  || asistente.nombre === email
    && asistente.pass === contra))
 
    if(email == '' || contra  == '' || user == '[]'){
        Swal.fire({
            title: "Error",
            text: "Error en los datos ingresados...¡verifique!"
        });
        document.getElementById('usu').value = '';
        document.getElementById('passw').value = '';
        document.getElementById('usu').focus();

    }else{
        addItems("Cuentas", user);       
        window.open('cuentas.html',"_self");
    }
}



