import JSONViewComponent from "./JSONViewComponent.js";

export default class RightView {
    constructor(jsonObj, modelController) {
        this.element = null;

        this.originalJSONObject = jsonObj;

        this.jsonViewComponent = null;
        this.undoButton = null;
        this.redoButton = null;
        
        this.modelController = modelController;

        this.instantiateView();
    }

    instantiateView = () => {
        const element = document.createElement('div')
        element.id = "right-view";

        const jsonViewComponent = new JSONViewComponent(this.originalJSONObject);
        //jsonViewComponent.element.parent = element;


        this.jsonViewComponent = jsonViewComponent;
        element.append(jsonViewComponent.element);
        this.element = element;
        
        console.log(this.element);


        const undoButton = document.createElement('button');
        undoButton.innerHTML = "Undo";

        const redoButton = document.createElement('button');
        redoButton.innerHTML = "Redo";

        undoButton.addEventListener('click', this.modelController.undo);

        redoButton.addEventListener('click', this.modelController.redo);

        this.element.append(undoButton);
        this.element.append(redoButton);

    }

}
