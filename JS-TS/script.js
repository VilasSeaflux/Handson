"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//getting form and form values
const AddForm = document.querySelector('.form');
const RecipeName = document.querySelector("#name");
const type = document.querySelector("#type");
const desc = document.querySelector("#desc");
const ul = document.querySelector('.ul');
//Recipe View modal 
const heading = document.querySelector('#RecipeName');
const description = document.querySelector("#recipeDescription");
const Recipetype = document.querySelector("#recipeType");
//Delete modal
const DeleteName = document.querySelector("#DeleteName");
const DeleteConfirm = document.querySelector("#DeleteConfirm");
const DeleteBtn = document.querySelector("#Delete");
//update form value:
const Uform = document.querySelector('.update-form');
const Uname = document.querySelector("#Uname");
const Utype = document.querySelector("#Utype");
const Udesc = document.querySelector("#Udesc");
let Uid;
//function to fetch the data;
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('http://localhost:3000/recipes');
        const data = yield res.json();
        data.map((item) => {
            RenderList(item);
        });
    }
    catch (err) {
        console.log(err);
    }
});
getData();
//function to render the Recipe lists
const RenderList = (listData) => {
    const li = document.createElement('li');
    li.classList.add("bg-light", "d-flex", "justify-content-between", "p-2");
    //This will create the span tag which will show name of Recipe
    const spanLeft = document.createElement('span');
    spanLeft.innerText = listData.name;
    //this will create the right side span which will have the view update delete button;
    const spanRight = document.createElement('span');
    spanRight.innerHTML = `
    <i onclick="viewRecipe(${listData.id})" data-bs-target="#descriptionModal" data-bs-toggle="modal" class="bi bi-eye btn btn-primary"></i> 
    <i onclick="EditModal('${listData.id}')" data-bs-target="#UpdateModal" data-bs-toggle="modal" class="bi bi-pencil btn btn-warning"></i> 
    <i data-bs-target="#DeleteModal" data-bs-toggle="modal" onclick="Delete('${listData.name}', ${listData.id})" class="bi bi-trash3 btn btn-danger"></i>`;
    li.append(spanLeft, spanRight);
    ul.append(li);
};
//submit data on form submit
AddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Recipe = {
        id: Date.now(),
        name: RecipeName.value,
        type: type.value,
        desc: desc.value
    };
    postData(Recipe);
});
//This function posts data into database
const postData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('http://localhost:3000/recipes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = yield res.json();
        console.log("data Uploaded", result);
    }
    catch (err) {
        console.log("ERROR: ", err);
    }
});
//this function will trigger view modal to view the recipe info:
const viewRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`http://localhost:3000/recipes/${id}`);
    const recipeData = yield res.json();
    heading.innerText = yield recipeData.name;
    description.innerText = yield recipeData.desc;
    Recipetype.innerText = yield recipeData.type;
});
//function to send delete request data from database:
const DeleteRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
    });
    console.log("data deleted successfully....");
});
//function to delete the item from database;
const Delete = (name, id) => {
    // const dataStr = JSON.parse(data);
    DeleteConfirm.innerText = `Are you sure you want to delete ${name} ?`;
    console.log(name, id);
    DeleteBtn.addEventListener('click', function () {
        DeleteRequest(id);
    });
};
//function to edit the database;
// let UpdatedRecipe: Recipe;
const EditModal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const preRes = yield fetch(`http://localhost:3000/recipes/${id}`);
    const preData = yield preRes.json();
    console.log("pre Data", preData);
    Uname.value = yield preData.name;
    Utype.value = yield preData.type;
    Udesc.value = yield preData.desc;
    Uid = yield preData.id;
    console.log(Uname.value);
});
const UpdateData = () => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatedRecipe = {
        id: Uid,
        name: Uname.value,
        type: Utype.value,
        desc: Udesc.value,
    };
    console.log("This is updatedata Parametere...", UpdateData);
    try {
        const currentResponse = yield fetch(`http://localhost:3000/recipes/${UpdatedRecipe.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(UpdatedRecipe),
        });
        const UpdateResponse = yield currentResponse.json();
        console.log("Updated Response....", UpdateResponse);
    }
    catch (err) {
        console.log(err);
    }
});
Uform.addEventListener('submit', () => {
    // e.preventDefault();
    UpdateData();
});
