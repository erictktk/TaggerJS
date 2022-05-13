import LeftView from "./source/LeftView.js";
import RightView from "./source/RightView.js";
import TopView from "./source/TopView.js";

import ModelController from "./source/ModelController.js";
import JSONViewComponent from "./source/JSONViewComponent.js";
import { TagsComponent } from "./source/TagsComponent.js";
import ToolsView from "./source/Tools.js";

import data from "./jj_better/thing.json" assert { type: "json"}

console.log(data);

const root = document.getElementById('root');
const main = document.getElementById('main');

let modelController = null;
let leftView = null;
let rightView = null;
let jsonViewComponent = null;
let topView = null;
let tagsComponent = null;
let toolsView = null;

setTimeout( runProgram, 500 );


function runProgram(){
    modelController = new ModelController(data);

    topView = new TopView("top-view");
    root.append(topView.element);
    root.append(main);

    toolsView = new ToolsView(modelController);
    topView.element.append(toolsView.element);

    rightView = new RightView(data, modelController);

    leftView = new LeftView(modelController, rightView.jsonViewComponent, data);
    jsonViewComponent = rightView.jsonViewComponent;

    tagsComponent = new TagsComponent(data);
    rightView.element.append(tagsComponent.element);
    

    main.append(leftView.element);
    main.append(rightView.element);

    modelController.setJSONViewComponent(rightView.jsonViewComponent);
    modelController.observers.push(jsonViewComponent);
}


let isDirty = function() { 
    return false; 
}

window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (!isDirty()) {
            return undefined;
        }
        
        let confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
};


