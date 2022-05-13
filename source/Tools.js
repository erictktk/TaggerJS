import ModelController from "./ModelController.js";
import { GetLibraryFromServer } from "./ajaxStuff.js";

export default class ToolsView{
    constructor(modelController, buttonClass="tools-button", doInitialLibraries=true){
        /** @type {ModelController} */
        this.modelController = modelController;

        this.element = null;
        this.buttonClass = buttonClass;

        
        this.updateAllButton = null;
        this.blankElement = null;
        this.uploadButton = null;
        this.loadNewDiv = null;
        /** @type{HTMLDivElement} */
        this.dropdownContent = null;

        this.dropdownArguments = [];
        this.dropdownLabels = [];

        this.updatePossibleLibrariesDropdown = modelController.updatePossibleLibaries;
        if (this.updatePossibleLibrariesDropdown){
            setInterval(this.updatePossibleLibrariesDropdown, 1000);
        }
        this.doInitialLibaries = doInitialLibraries;
        this.initialArgumentPairs = [['JJ', 'jj'], ['Hard Sci-fi', 'hrdscifi'], ['Ot', 'ot']];

        this.instantiateView();
    }

    updatePossibleLibraries = () => {
        //this.loadNewButton 

    }

    onSuccessfulUpdate = (data) => {
        console.log("onSuccessfulUpdate");
        //this.resetDropdownContents(data);
    }

    ajaxLoadNewWrapper = (e) => {
        console.log("ajaxLoadNewWrapper");

        let val = window.confirm("Load new library? (Make sure to upload progress)");

        GetLibraryFromServer()
    }

    //onUpdate

    resetDropdownContents = (argumentPairs) => {
        //const argumentPairs = data['argumentPairs'];

        console.log("resetDropdownContents!");
        const dropdownContent = this.dropdownContent;

        while (dropdownContent.children.length > 0){
            dropdownContent.removeChild(dropdownContent.children[0]);
        }

        this.dropdownArguments = [];
        this.dropdownLabels = [];
        console.log(argumentPairs.length);
        for(let i = 0; i < argumentPairs.length; i += 1){
            this.dropdownLabels.push(argumentPairs[i][0]);
            this.dropdownArguments.push(argumentPairs[i][1]);
        }

        for(let i = 0; i < this.dropdownLabels.length; i += 1){
            const dropdownDiv = document.createElement('div')
            dropdownDiv.innerHTML = this.dropdownLabels[i];
            
            dropdownDiv.className = "dropdown-element";
            dropdownDiv.addEventListener("click", () => { console.log(this.dropdownArguments[i]); this.ajaxLoadNewWrapper(this.dropdownArguments[i]); });

            dropdownContent.append(dropdownDiv);

            console.log(i);
        }

        this.dropdownContent = dropdownContent;
        while(this.loadNewDiv.children.length > 0){
            this.loadNewDiv.removeChild(this.loadNewDiv.children[0]);
        }
        this.loadNewDiv.append(dropdownContent);
        
    }

    onSuccessfulUpload = (e) => {

    }

    upload = () => {

    }


    instantiateView = () => {
        this.element = document.createElement('div');
        this.element.id = 'tools-view';

        this.updateAllButton = document.createElement('div');
        this.updateAllButton.addEventListener('click', ()=>{this.modelController.updateAll();});
        this.updateAllButton.className = "top-button";
        this.updateAllButton.innerHTML = "Update All";



        this.blankElement = document.createElement('div');
        this.blankElement.innerHTML = "&nbsp&nbsp&nbsp&nbsp";

        this.uploadButton = document.createElement('div');
        this.uploadButton.addEventListener('click', ()=>{this.upload();});
        this.uploadButton.className = "top-button";
        this.uploadButton.innerHTML = "Upload";


        this.loadNewDiv = document.createElement('div');
        this.loadNewDiv.className = "dropdown top-button";
        this.loadNewDiv.innerHTML = "Load New";

        this.dropdownContent = document.createElement('div');
        this.dropdownContent.className = 'dropdown-content';


        this.element.append(this.updateAllButton);
        this.element.append(this.uploadButton);
        this.element.append(this.loadNewDiv);

        if (this.doInitialLibaries){
            this.resetDropdownContents(this.initialArgumentPairs);
        }

    }
}