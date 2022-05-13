import { GeoViewComponent } from "./GeoViewComponent.js";

export default class LeftView {
    constructor(modelController, jsonViewComponent, jsonObj) {
        this._modelController = modelController;
        this.jsonViewComponent = jsonViewComponent;

        /** @type {HTMLDivElement}*/
        this.componentView = null;
        this._jsonObj = jsonObj;
        this.geoObjects = [];

        this.element = null;

        this.instantiateView();

    }

    onClick = (id) => {
        console.log("on click!");
        for(let i = 0; i < this.geoObjects.length; i += 1){
            this.geoObjects[i].unHighlight();
        }

        this.geoObjects[id].highlight();
    }

    resetGridView = (jsonObj) => {
        const componentView = this.componentView;

        this._jsonObj = jsonObj;

        
        while(componentView.children.length > 0 ){
            componentView.removeChild(componentView.children[0]);
        }

        for (let i = 0; i < this._jsonObj['custom_tags'].length; i += 1) {
            const curEntry = this._jsonObj['custom_tags'];
            const geo = new GeoViewComponent(this._modelController, this, this._jsonObj, i);

            this.geoObjects.push(geo);
            componentView.append(geo.element);
        }
    }

    instantiateView = (e) => {
        const element = document.createElement('div');
        element.id = "left-side";

        this.element = element;

        const topElement = document.createElement('div');
        topElement.innerHTML = "TAGGER";
        topElement.id = "title"

        element.append(topElement);

        const componentView = document.createElement('div');
        componentView.id = "component-view";
        

        for (let i = 0; i < this._jsonObj['custom_tags'].length; i += 1) {
            const curEntry = this._jsonObj['custom_tags'];
            const geo = new GeoViewComponent(this._modelController, this, this._jsonObj, i);

            this.geoObjects.push(geo);
            componentView.append(geo.element);
        }

        element.append(componentView);

    };

}
