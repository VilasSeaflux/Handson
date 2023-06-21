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
//function to fetch the data;
var getData = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, data_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:3000/recipes')];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data_1 = _a.sent();
                data_1.map(function (item) {
                    console.log(item);
                    RenderUl(item);
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
var RenderUl = function (listData) {
    var li = document.createElement('li');
    li.classList.add("bg-light", "d-flex", "justify-content-between", "p-2");
    //This will create the span tag which will show name of Recipe
    var spanLeft = document.createElement('span');
    spanLeft.innerText = listData.name;
    //this will create the right side span which will have the view update delete button;
    var spanRight = document.createElement('span');
    spanRight.innerHTML = '<i class="bi bi-eye btn btn-primary"></i> <i class="bi bi-pencil btn btn-warning"></i> <i class="bi bi-trash3 btn btn-danger"></i>';
    li.append(spanLeft, spanRight);
    ul.append(li);
};
AddForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log(id.value,RecipeName.value,type.value,desc.value);
    // console.log(id.value);
    // console.log(RecipeName.value);
    // console.log(type.value);
    // console.log(desc.value);
    var Recipe = {
        id: id.valueAsNumber,
        name: RecipeName.value,
        type: type.value,
        desc: desc.value
    };
    // console.log(Recipe);
    postData(Recipe);
});
//This function posts data into database
var postData = function (data) { return __awaiter(_this, void 0, void 0, function () {
    var id, name, type, desc, res, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = data.id, name = data.name, type = data.type, desc = data.desc;
                if (!(id == '' || name == '' || type == '' || desc == '')) return [3 /*break*/, 1];
                alert("Please fill the details");
                return [3 /*break*/, 5];
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch('http://localhost:3000/recipes', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                result = _a.sent();
                console.log("data Uploaded", result);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log("ERROR: ", err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var render = function () {
};
var data = fetch('http://localhost:3000/recipes').then(function (res) { return res.json(); }).then(function (data) { return console.log(data); });
console.log(data);
