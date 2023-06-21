var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//getting form and form values
var AddForm = document.querySelector('.form');
var id = document.querySelector('#id');
var RecipeName = document.querySelector("#name");
var type = document.querySelector("#type");
var desc = document.querySelector("#desc");
var ul = document.querySelector('.ul');
//Description modal 
var heading = document.querySelector('#RecipeName');
var description = document.querySelector("#recipeDescription");
//function to fetch the data;
var getData = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:3000/recipes')];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                data.map(function (item) {
                    console.log(item);
                    RenderList(item);
                    // view(item.id);
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
getData();
//function to render the Recipe lists
var RenderList = function (listData) {
    var li = document.createElement('li');
    li.classList.add("bg-light", "d-flex", "justify-content-between", "p-2");
    //This will create the span tag which will show name of Recipe
    var spanLeft = document.createElement('span');
    spanLeft.innerText = listData.name;
    //this will create the right side span which will have the view update delete button;
    var spanRight = document.createElement('span');
    spanRight.innerHTML = "<i onclick=\"viewRecipe(" + listData.id + ")\" data-bs-target=\"#descriptionModal\" data-bs-toggle=\"modal\" class=\"bi bi-eye btn btn-primary\"></i> \n    <i class=\"bi bi-pencil btn btn-warning\"></i> \n    <i onclick=\"Delete(" + listData.id + ")\" class=\"bi bi-trash3 btn btn-danger\"></i>";
    li.append(spanLeft, spanRight);
    ul.append(li);
};
//this function will trigger view modal to view the recipe info:
var viewRecipe = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var res, recipeData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/recipes/" + id)];
            case 1:
                res = _c.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                recipeData = _c.sent();
                _a = heading;
                return [4 /*yield*/, recipeData.name];
            case 3:
                _a.innerText = _c.sent();
                _b = description;
                return [4 /*yield*/, recipeData.desc];
            case 4:
                _b.innerText = _c.sent();
                return [2 /*return*/];
        }
    });
}); };
AddForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var Recipe = {
        id: id.valueAsNumber,
        name: RecipeName.value,
        type: type.value,
        desc: desc.value
    };
    postData(Recipe);
});
//This function posts data into database
var postData = function (data) { return __awaiter(_this, void 0, void 0, function () {
    var res, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:3000/recipes', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                result = _a.sent();
                console.log("data Uploaded", result);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log("ERROR: ", err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//function to send delete request data from database:
var DeleteRequest = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fetch("http://localhost:3000/recipes/" + id, {
            method: "DELETE"
        });
        console.log("data deleted successfully....");
        return [2 /*return*/];
    });
}); };
//function to delete the item from database;
var Delete = function (id) {
    var confirm = window.confirm("Are you sure you want to delete This??");
    console.log(confirm);
    if (confirm) {
        DeleteRequest(id);
    }
    else {
        console.log("abort deletion....");
    }
};
