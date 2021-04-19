const cars = [
    {
        id: 0,
        brand: 'BMW',
        model: 'THE X1',
        color: 'Silver',
        age: '2021',
        price: 75000
    }
]

function printCars(dataCars){
    const container = document.getElementById('table-container');
    container.innerHTML='';
    dataCars.forEach(cars =>{
        container.innerHTML += `<tr>
                                    <td>${cars.brand}</td>
                                    <td>${cars.model}</td>
                                    <td>${cars.color}</td>
                                    <td>${cars.age}</td>
                                    <td>${cars.price}</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button type="button" class="btn btn-warning" onclick="actionButtonEdit(${cars.id})"><i class="fas fa-edit"></i> Editar</button>
                                            <button type="button" class="btn btn-danger" onclick="deleteCar(${cars.id})"><i class="fas fa-trash"></i> Eliminar</button>
                                        </div>
                                    </td>
                                </tr>`
    });
}

/*********** Form Container **************/
function showFormContainer(){
    const form= document.getElementById('form-container');
    form.classList.remove('d-none');
    changeSaveButton();
}

function hideFormContainer(){
    const formContainer= document.getElementById('form-container');
    formContainer.classList.add('d-none');
    formReset();
}

function formReset(){
    const form = document.getElementById('form-cars').reset();
}

/****************** CRUD ********************/
function addCar(){
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const color = document.getElementById('color').value;
    const age = document.getElementById('age').value;
    const price = document.getElementById('price').value;

    const newCar = {
        id: generatedId(),
        brand: brand,
        model: model,
        color: color,
        age: age,
        price: price
    }

    cars.push(newCar);
    printCars(cars);
    hideFormContainer();
}
function deleteCar(id){
    const index = cars.findIndex((car)=> car.id === id);
    cars.splice(index,1);
    printCars(cars);
}
function updateCar(id){
    cars[id].brand=document.getElementById('brand').value;
    cars[id].model=document.getElementById('model').value;
    cars[id].color=document.getElementById('color').value;
    cars[id].age=document.getElementById('age').value;
    cars[id].price=document.getElementById('price').value;
    printCars(cars);
    hideFormContainer();
}
function actionButtonEdit(id){
    document.getElementById('brand').value= cars[id].brand;
    document.getElementById('model').value= cars[id].model;
    document.getElementById('color').value= cars[id].color;
    document.getElementById('age').value=cars[id].age;
    document.getElementById('price').value=cars[id].price;

    showFormContainer();
    changeEditButton(id);
}

function submitForm(){
    const button = getSubmitButton();
    if(button.textContent.trim() === 'Editar'){
        updateCar(button.value);
    }else{
        console.log(button.textContent)
        addCar();
    }
}
/*************Change Button form ******************/
function changeEditButton(id){
    const button = getSubmitButton();
    button.textContent = ' Editar';
    button.insertAdjacentHTML('afterbegin','<i class="fas fa-edit"></i>');
    button.classList.remove('btn-success');
    button.classList.add('btn-warning');
    button.value = id;
}

function changeSaveButton(){
    const button = getSubmitButton();
    button.textContent = ' Guardar';
    button.insertAdjacentHTML('afterbegin','<i class="fas fa-save"></i>');
    button.classList.add('btn-success');
    button.classList.remove('btn-warning');
}

/****************** Others ********************/
function generatedId(){
    let biggerId =0;
    cars.forEach((car)=>{
        if(car.id > biggerId){
            biggerId = car.id;
        }
    })
    return biggerId+=1;
}

function getSubmitButton(){
    return document.getElementById('btn-submit-form');
}

printCars(cars);