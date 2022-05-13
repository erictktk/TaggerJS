import data from "../../juju_better/thing.json";
import ModelController from "../ModelController.js";

import { describe, expect, test } from "@jest/globals";

describe("test if history works", ()=>{
    test("test history index and length", ()=>{
        const jsonObj = data;
        const modelController = new ModelController(jsonObj);

        expect(modelController.historyIndex).toBe(0);

        modelController.updateFromEntry(0, "lala");

        expect(modelController.historyIndex).toBe(0);

        expect(modelController.history.length).toBe(2);

        modelController.undo();

        expect(modelController.historyIndex).toBe(1);
    });

    test("test if history updates tags correctly", ()=>{

        const jsonObj = data;
        const modelController = new ModelController(jsonObj);

        expect(modelController.historyIndex).toBe(0);

        modelController.updateFromEntry(0, "lala");
        expect(modelController._jsonObj['custom_tags'][0]).toStrictEqual(["lala"]);

        modelController.undo();
        expect(modelController._jsonObj['custom_tags'][0]).toStrictEqual([]);

        modelController.redo();
        expect(modelController._jsonObj['custom_tags'][0]).toStrictEqual(["lala"]);

        modelController.undo();
        expect(modelController._jsonObj['custom_tags'][0]).toStrictEqual([]);

        modelController.updateFromEntry(0, "lala okok");
        expect(modelController._jsonObj['custom_tags'][0]).toStrictEqual(["lala", "okok"]);

        expect(modelController.history.length).toBe(2);
    });
});