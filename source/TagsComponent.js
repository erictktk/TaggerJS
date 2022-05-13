import ModelController from "./ModelController.js";

let suggestedTags = ['plank', 'plate', 'height', 'box', 'series', 'cylinder', 'greeble', 'complex', 'verycomplex', 'semibox', 'shell', 'simple', 'pipes', 'separable', 'component', 'fullcomponent'];

export class TagsComponent{
    constructor(initJSONObj){
        this.element = null;
        this.initJSONObj = JSON.parse(JSON.stringify(initJSONObj));

        this.suggestedTags = null;

        this.instantiateView();
    }

    resetTagsString = () => {
        //todo implement tags suggestions from stuff later

        /*
        let suggestedTagsStr = suggestedTags.join(', ');

        this.tagsTags.innerHTML = suggestedTagsStr.substring(0, suggestedTagsStr.length-2);*/

        let suggestedTagsStr = '';
        for(let i = 0; i < suggestedTags.length; i += 1){
            if (i % 6 === 0){
                suggestedTagsStr += '<br>';
            }
            suggestedTagsStr += suggestedTags[i] + ', ';
        }

        suggestedTagsStr = suggestedTagsStr.substring(0, suggestedTagsStr.length-2);
        this.tagsTags.innerHTML = suggestedTagsStr;
    }

    instantiateView = () => {
        this.element = document.createElement('div');
        this.element.id = "tags-component";

        this.tagsLabel = document.createElement('div');
        this.tagsLabel.id = 'tags-label';
        this.tagsLabel.innerHTML = "Suggested Tags:"

        this.tagsTags = document.createElement('div');
        this.resetTagsString();

        this.element.append(this.tagsLabel);
        this.element.append(this.tagsTags);


        //this.
    }
}