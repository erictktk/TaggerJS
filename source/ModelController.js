//const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');


export default class ModelController {
    constructor(jsonObj, doUpdateAvailableLibraries) {
        this.jsonObjOriginal = jsonObj;
        this._jsonObj = JSON.parse(JSON.stringify(jsonObj));
        this.history = [JSON.parse(JSON.stringify(jsonObj))];
        this.historyIndex = 0;
        //

        /** @type {Array<Object> } */
        this.tag_entries = jsonObj['custom_tags'];
        this.jsonViewComponent = null;
        
        this.doUpdateAvailableLibraries = false;

        this.observers = [];
    }

    setJSONViewComponent(jsonViewComponent){
        this.jsonViewComponent = jsonViewComponent;
    }


    


    updateAll(){

    }

    updateFromEntry(id, updatedTags) {
        console.log('update!');

        const tagsArr = updatedTags.split(' ');

        if (this.historyIndex === 0){
            //const old = JSON.parse(JSON.stringify(this._jsonObj));
            //this.history.push(old);



            this._jsonObj['custom_tags'][id] = tagsArr;

            const newState = JSON.parse(JSON.stringify(this._jsonObj));
            this.history.push(newState)
        }
        else{
            console.log('old history');

            const newHistory = [];
            const count = this.history.length-this.historyIndex;
            console.log(count);
            for(let i = 0; i < this.history.length-this.historyIndex; i += 1 ){
                //
                newHistory.push(this.history)[i];
            }

            //const old = JSON.parse(JSON.stringify(this._jsonObj));
            //this.history.push(old);
            this._jsonObj['custom_tags'][id] = tagsArr;

            console.log(tagsArr);

            const newState = JSON.parse(JSON.stringify(this._jsonObj));
            this.history = newHistory;
            this.history.push(newState)

            this.historyIndex = 0;
        }
        
        this.updateObservers();
        if (this.jsonViewComponent !== null){
            this.updateEntry(id);
        }
    }

    select(id){
        this.jsonViewComponent.onSelect(id);
    }

    updateEntry(id){
        this.jsonViewComponent.onSelect(id);
    }

    undo = () => {
        if (this.historyIndex >= 0 && (this.historyIndex < this.history.length)){
            console.log('undo!');
            console.log(this.historyIndex);
            this.historyIndex += 1;

            this._jsonObj = this.history[this.history.length-1-this.historyIndex];

            this.updateObservers();
        }
    }

    redo = () => {
        console.log('redo!');
        //something = 10;
        if (this.historyIndex > 0 && (this.historyIndex < this.history.length)){
            this.historyIndex -= 1;

            this._jsonObj = this.history[this.history.length-1-this.historyIndex];

            this.updateObservers();
        }
    }

    updateObservers(){
        for(let i = 0; i < this.observers.length; i += 1){
            this.observers[i].updateFromModel(this._jsonObj);
        }
    }

    uploadToServer = () => {
        //implement ajax calls
    }
}



