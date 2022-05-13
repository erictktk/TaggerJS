import ModelController from "./ModelController.js";

export default class JSONViewComponent {
    constructor(jsonObj, modelController) {
        this.element = null;

        this.label = null;
        this.textElement = null;

        this.modelController = modelController;

        this.jsonEntryElement = null;
        this.jsonObj = jsonObj;
        this.instantiateView();
        this.updateJSONOutput(this.jsonObj);

        this.uploadButton = null;
    }

    copyToClipBoard = () =>{
        let text = this.textElement.value;
        navigator.clipboard.writeText(text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
    }

    updateJSONOutput(jsonObj) {
        let string = JSON.stringify(jsonObj);
        //console.log(string);

        this.textElement.value = string;
    }

    updateSaveFileName(){
        const libraryName = "juju";

        const date = new Date();

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const dayDate = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const dateStr = `${month}-${dayDate}-${year} ${hours}-${minutes}-${seconds}`;
        const fullStr = libraryName + " " + dateStr;
    }

    onSelect = (id) => {
        let fileName = this.jsonObj['objective'][id]['fileName'];
        console.log(this.jsonObj['custom_tags'][parseInt(id)]);
        let tag_entries = this.jsonObj['custom_tags'][parseInt(id)].join(' ');

    
        let thingToWrite = tag_entries;
        if (tag_entries === ""){
            thingToWrite = "no tag entries";
        }
        
        this.jsonEntryElement.value = thingToWrite;
        this.jsonEntryLabel.innerHTML = "JSON Entry: " + fileName;

        this.jsonEntryLabel.id = "nothing";
        setTimeout(this.rehighlightEntryLabel, 10);
        
    }

    rehighlightEntryLabel = () => {
        this.jsonEntryLabel.id = "json-entry-label-cooldown";
    }

    updateFromModel = (jsonObj) => {
        this.jsonObj = jsonObj;
        this.updateJSONOutput(jsonObj);
    }


    uploadEvent = () => {
        this.modelController.upl
    }

    createUploadButton = () => {
        const uploadButton = document.createElement('button');
        uploadButton.innerHTML = "Upload Changes to Server";
        uploadButton.addEventListener("click", this.uploadEvent);

        this.uploadButton = uploadButton;

        this.element.append

    }

    instantiateView = () => {
        const element = document.createElement('div');
        element.id = "json-view-component";
        this.element = element;

        const label = document.createElement('div');
        label.id = "json-view-label";
        label.innerHTML = "JSON Output";

        const textElement = document.createElement('textarea');  // #type: ht
        
        
        textElement.readOnly = true;
        textElement.id = "json-output";
        textElement.rows = 30;

        this.textElement = textElement;

        const copyToButton = document.createElement('button');
        copyToButton.innerHTML = "Copy To Clipboard";
        copyToButton.addEventListener("click", this.copyToClipBoard);

        //element.

        const jsonEntryLabel = document.createElement('div');
        jsonEntryLabel.id = "json-entry-label";
        jsonEntryLabel.innerHTML = "No JSON Entry selected"
        this.jsonEntryLabel = jsonEntryLabel;

        const jsonEntryElement = document.createElement('input');
        jsonEntryElement.id = "file-name-element";
        jsonEntryElement.readOnly = true;
        this.jsonEntryElement = jsonEntryElement;

        element.append(label);
        element.append(textElement);
        element.append(copyToButton);

        element.append(jsonEntryLabel);
        element.append(jsonEntryElement);

        this.element = element;
    };
}
