//getting form and form values
const AddForm = document.querySelector('.form') as HTMLFormElement;
const id = document.querySelector('#id') as HTMLInputElement;
const RecipeName = document.querySelector("#name") as HTMLInputElement;
const type = document.querySelector("#type") as HTMLInputElement;
const desc = document.querySelector("#desc") as HTMLInputElement;

const ul = document.querySelector('.ul') as HTMLUListElement;


interface Recipe {
    id: number | string,
    name: string,
    type: string,
    desc: string,
}

//function to fetch the data;
const getData = async () =>{
    try{
        const res = await fetch('http://localhost:3000/recipes');
        const data = await res.json();
        data.map((item : Recipe)=> {
            console.log(item);
            RenderUl(item);
        })
    }catch(err){
        console.log(err);
    }
}
getData();

//function to render the Recipe lists

const RenderUl = (listData: Recipe) => {    
    const li = document.createElement('li');
    li.classList.add("bg-light", "d-flex", "justify-content-between","p-2");
    
    //This will create the span tag which will show name of Recipe
    const spanLeft = document.createElement('span');
    spanLeft.innerText = listData.name;

    //this will create the right side span which will have the view update delete button;
    const spanRight = document.createElement('span');
    spanRight.innerHTML = '<i class="bi bi-eye btn btn-primary"></i> <i class="bi bi-pencil btn btn-warning"></i> <i class="bi bi-trash3 btn btn-danger"></i>'
    li.append(spanLeft,spanRight);
    ul.append(li);
}


AddForm.addEventListener('submit' ,(e: Event) =>{
    e.preventDefault();
    // console.log(id.value,RecipeName.value,type.value,desc.value);
    // console.log(id.value);
    // console.log(RecipeName.value);
    // console.log(type.value);
    // console.log(desc.value);
    
    const Recipe:Recipe = {
        id: id.valueAsNumber,
        name: RecipeName.value,
        type: type.value,
        desc: desc.value
    }
    // console.log(Recipe);
    postData(Recipe);
});

//This function posts data into database
const postData = async (data:Recipe) => {
    const {id,name,type,desc} = data;
    if(id ==  '' || name == '' || type == '' || desc == ''){
        alert("Please fill the details");
    }else{
        try{
            const res = await fetch('http://localhost:3000/recipes',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            console.log("data Uploaded",result); 
        }catch(err){
            console.log("ERROR: ",err);
        }
    }
   
}

const render = () => {

}
const data = fetch('http://localhost:3000/recipes').then(res => res.json()).then(data => console.log(data))
console.log(data)