import data from "../../juju_better/thing.json";

import { expect, test } from "@jest/globals";

test("testing import correctly", ()=> {
    //console.log(data);
    console.log(typeof(data));
    const jsonObj = data;
    
    expect(jsonObj['objective'][0]['fileName']).toBe('0000.bgeo');
    expect(jsonObj['objective'].length).toBeGreaterThan(20);
});

/*
describe("tests for validation", ()=> {
    test("testing only text", () => {
        const string = "sdfdsf";
        expect(fv.validateOnlyText(string)).toBeFalsy();

        const string2 = "Sfdsdf";

        expect(fv.validateOnlyText(string2)).toBeFalsy();

        const string3 = "sfsf2";

        expect(fv.validateOnlyText(string3)).toBeTruthy();
    });

    test("testing characterLimit", ()=> {
        const string = "abcabc";

        expect(fv.validateCharacterLimit(string,5)).toBeTruthy();

        const string2 = "abcab";

        expect(fv.validateCharacterLimit(string2, 5)).toBeFalsy();
    });

    test("testing is positive int", ()=>{
        const str = "1";

        expect(fv.validateIsPositiveInt(str)).toBeFalsy();

        const str2 = "aaa";
    
        expect(fv.validateIsPositiveInt(str2)).toBeTruthy();

        const str3 = "1.5";

        expect(fv.validateIsPositiveInt(str3)).toBeTruthy();
    });


    test("test within int range", () => {
        const str = 3;

        expect(fv.validateIsWithinRange(str, 0, 3)).toBeFalsy();

        expect(fv.validateIsWithinRange(str, 0, 2 )).toBeTruthy();

        expect(fv.validateIsWithinRange(str, 4, 8)).toBeTruthy();
    });
});
*/