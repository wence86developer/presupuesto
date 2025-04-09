// creamos const de tipo arrays(se puede modificar)
const ingresos = [
    //creamos nuevos elementos
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500)
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];
//creamos funcion flecha cargar app(cargamos las funciones)
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
//funcion flecha total ingresos e egreso para calcular  segun el valor
let totalIngresos = ()=>{
    let totalIngreso = 0;
    //recorremos ingreso y concatenamos su valor
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
//creamos funcio flecha cargar cabecero(actualiza los valores del html)
let cargarCabecero = ()=>{
    //calcular el  total presupuesto
    let presupuesto = totalIngresos() - totalEgresos();
    //definimos la variable porcentaje calculamos tEgresos entre(/ respecto de) tIngresos
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    //imprimimos en html
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//especificamos la moneda
//metodo (toLocalString) concepto de internalizacion 
//currency especificamos la moneda 
//especificamos los centavos minimo de  2 digitos  (minimunFractionDigit)
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

//especificamos el porcentaje(percent)
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

//creamos funcion flecha cargar Ingreso
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

//funcion flecha eliminar ingresos usamos el metodo findIndex para recorrer los id ingreso
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    //splice elimina el elemento del id 
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//creamos la funcionflecha cargarEgresos
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

//creamos funcion flecha eliminar Egreso
let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//creamos funcion flecha agregar Datos
let agregarDato = ()=>{
    let forma = document.forms['forma'];//recuperamos el formulario
    //recuperamos del formulario input el tipo, descripcion, valor
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    //si el value(valor) descripcion es diferente de cadena vacia y si value de valor es diferente de cadena vacia
    if(descripcion.value !== '' && valor.value !== ''){
        //si tipo value es igual a 'ingreso'{condicion}
        if(tipo.value === 'ingreso'){
            //metodo push(agregamos nuevo ingreso(descripcion +valor));
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        //de lo contrario si tipo value es igual a 'egreso'{condicio}
        else if(tipo.value === 'egreso'){
            //metodo push(agregamos nuevo egreso(descripcion +valor));
           egresos.push( new Egreso(descripcion.value, +valor.value));
           cargarCabecero();
           cargarEgresos();
        }
    }
}