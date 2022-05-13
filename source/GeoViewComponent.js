export class GeoViewComponent {
    constructor(modelController, leftView, jsonObj, id) {
        /** @type {ModelController} */
        this.modelController = modelController;
        //this.jsonViewComponent = jsonViewComponent;
        //this.jsonObj = jsonObj;
        //#region html elements
        this.element = null;
        this.borderElement = null;

        this.labelElement = null;
        this.imageElement = null;
        /** @type{HTMLInputElement} */
        this.tagsElement = null;

        this.leftView = leftView;

        this.updateButton = null;
        //#endregion
        //
        this.label = "Test Label " + id;
        this.jsonObj = jsonObj;
        this.tags = null;
        this.id = id;
        this.imagePath = null;

        this.parseJSON();

        this.instantiateView();

        //
    }

    parseJSON(){
        const jsonObj = this.jsonObj;
        this.label = jsonObj['objective'][this.id]['fileName'];
        let customTags = jsonObj['custom_tags'];

        if (!customTags){
            customTags = jsonObj['customTags'];
        }
        
        this.tags = customTags[this.id];
        this.imagePath = jsonObj['objective'][this.id]['photo'];
    }

    onUpdate = (e) => {
        this.modelController.updateFromEntry(this.id, this.tagsElement.value);
    };

    onClick = (e) => {
        this.modelController.select(this.id);
        this.leftView.onClick(this.id);
        
        console.log("hi!");
        console.log(this.id);
    };

    highlight = () => {
        this.borderElement.className = "image-border-element-selected";
    }

    unHighlight = () => {
        this.borderElement.className = "image-border-element";
    }

    instantiateView = (e) => {
        const element = document.createElement('div');
        element.className = "component-element";
        this.element = element;

        const borderElement = document.createElement('div');
        borderElement.className = "image-border-element";
        this.borderElement = borderElement;

        const labelElement = document.createElement('div');
        labelElement.innerHTML = this.label;
        labelElement.className = "label-element";

        element.append(labelElement);

        const imgElement = document.createElement('img');
        imgElement.className = "image-element";
        imgElement.addEventListener("click", this.onClick);
        //console.log('folder=./jj_better/');
        imgElement.src = "./jj_better/" + this.imagePath;
        const width = 500;
        const height = Math.floor(width/(5/3));
        //console.log(height);
        imgElement.style.width = width + "px";
        imgElement.style.height = height + "px";
        imgElement.addEventListener("click", this.onClick);

        

        borderElement.append(imgElement);
        
        element.append(borderElement);
        //console.log(borderElement.getBoundingClientRect());

        const tagsElement = document.createElement('input');
        tagsElement.setAttribute('type', 'text');
        tagsElement.value = this.tags;
        this.tagsElement = tagsElement;

        const updateButton = document.createElement('button');
        updateButton.innerHTML = "Update";
        updateButton.addEventListener("click", this.onUpdate);

        element.append(tagsElement);
        element.append(updateButton);
    };
}
