
//getting form and form values
const AddForm = document.querySelector('.form') as HTMLFormElement;
const RecipeName = document.querySelector("#name") as HTMLInputElement;
const type = document.querySelector("#type") as HTMLInputElement;
const desc = document.querySelector("#desc") as HTMLInputElement;

const ul = document.querySelector('.ul') as HTMLUListElement;
//Recipe View modal 
const heading = document.querySelector('#RecipeName') as HTMLHeadingElement;
const description = document.querySelector("#recipeDescription") as HTMLParagraphElement;
const Recipetype = document.querySelector("#recipeType") as HTMLParagraphElement;

//Delete modal
const DeleteName = document.querySelector("#DeleteName") as HTMLHeadingElement;
const DeleteConfirm = document.querySelector("#DeleteConfirm") as HTMLParagraphElement;
const DeleteBtn = document.querySelector("#Delete")!;


//update form value:
const Uform = document.querySelector('.update-form') as HTMLFormElement;
const Uname = document.querySelector("#Uname") as HTMLInputElement;
const Utype = document.querySelector("#Utype") as HTMLInputElement;
const Udesc = document.querySelector("#Udesc") as HTMLInputElement;
let Uid:number;

interface Recipe {
    id: number,
    name: string,
    type: string,
    desc: string,
}

//function to fetch the data;
const getData = async () => {
    try {
        const res = await fetch('http://localhost:3000/recipes');
        const data = await res.json();
        data.map((item: Recipe) => {
            RenderList(item);
        })
    } catch (err) {
        console.log(err);
    }
}
getData();

//function to render the Recipe lists
const RenderList = (listData: Recipe) => {
    const li = document.createElement('li');
    li.classList.add("bg-light", "d-flex", "justify-content-between","py-2");

    //This will create the span tag which will show name of Recipe
    const spanLeft = document.createElement('span');
    spanLeft.innerText = listData.name;

    //
    const SrSpan =  document.createElement('span');
    SrSpan.innerText = listData.id.toString();

    //
    const RecipeType = document.createElement('span');
    RecipeType.innerText = listData.type;
    //this will create the right side span which will have the view update delete button;
    const spanRight = document.createElement('span');
    spanRight.innerHTML = `
    <i onclick="viewRecipe(${listData.id})" data-bs-target="#descriptionModal" data-bs-toggle="modal" class="bi bi-eye btn btn-info text-white"></i> 
    <i onclick="EditModal('${listData.id}')" data-bs-target="#UpdateModal" data-bs-toggle="modal" class="bi bi-pencil btn btn-warning"></i> 
    <i data-bs-target="#DeleteModal" data-bs-toggle="modal" onclick="Delete('${listData.name}', ${listData.id})" class="bi bi-trash3 btn btn-danger"></i>`
    li.append(spanLeft,RecipeType,spanRight);
    ul.append(li);
}


//submit data on form submit
AddForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const Recipe: Recipe = {
        id: Date.now(),
        name: RecipeName.value,
        type: type.value,
        desc: desc.value
    }
    postData(Recipe);
});

//This function posts data into database
const postData = async (data: Recipe) => {
    try {
        const res = await fetch('http://localhost:3000/recipes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log("data Uploaded", result);
    } catch (err) {
        console.log("ERROR: ", err);
    }
}


//this function will trigger view modal to view the recipe info:
const viewRecipe = async (id: (number | string)) => {
    const res = await fetch(`http://localhost:3000/recipes/${id}`);
    const recipeData = await res.json();
    heading.innerText = await recipeData.name;
    description.innerText = await recipeData.desc;
    Recipetype.innerText = await recipeData.type;
}

//function to send delete request data from database:
const DeleteRequest = async (id: any) => {
    fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
    });
    console.log("data deleted successfully....");
};

//function to delete the item from database;
const Delete = (name: string, id: number) => {
    // const dataStr = JSON.parse(data);
    DeleteConfirm.innerText = `Are you sure you want to delete ${name} ?`;
    console.log(name, id);
    DeleteBtn.addEventListener('click', function () {
        DeleteRequest(id)
    }
    );
}


//function to get prefilled form value;
const EditModal = async (id: number) => {
    const preRes = await fetch(`http://localhost:3000/recipes/${id}`)
    const preData = await preRes.json();
    console.log("pre Data",preData);
    
    Uname.value =  await preData.name;
    Utype.value =  await preData.type;
    Udesc.value =  await preData.desc;
    Uid = await preData.id;
    console.log(Uname.value);


}

//function to Edit to specific dish data;
const UpdateData = async () => {
    const UpdatedRecipe: Recipe ={
        id: Uid,
        name: Uname.value,
        type: Utype.value,
        desc: Udesc.value,
    }
    console.log("This is updatedata Parametere...",UpdateData);
    try{
        const currentResponse = await fetch(`http://localhost:3000/recipes/${UpdatedRecipe.id}`,{
            method: "PATCH",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(UpdatedRecipe),
        });
        const UpdateResponse = await currentResponse.json();
        console.log("Updated Response....",UpdateResponse);
    }catch(err){
        console.log(err);
    }
}

//on form submit the data will get updated;
Uform.addEventListener('submit',() => {
    UpdateData();
});
