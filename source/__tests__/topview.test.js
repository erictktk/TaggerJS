/**
 * @jest-environment jsdom
 */

import { expect, test, describe } from "@jest/globals";
import TopView from "../TopView.js";

describe("test if topview signin works", ()=>{
    let topView = new TopView();

    test("test if username updates correctly", ()=>{
        expect(topView.username).toBe("");

        topView.userNameInput.value = "username2";
        /** @type {HTMLInputElement} */
        const userNameInput = topView.userNameInput;

        const event = new InputEvent("change", {'data': "username2"});
        userNameInput.dispatchEvent(event);

        expect(topView.username).toBe("username2");
    });

    test("test if password callback updates correctly", ()=>{
        expect(topView.password).toBe("");

        topView.passwordInput.value = "pwpw";
        /** @type {HTMLInputElement} */
        const passwordInput = topView.passwordInput;

        const event = new InputEvent("change", {'data': "pwpw"});
        passwordInput.dispatchEvent(event);

        expect(topView.password).toBe("pwpw");

    });

    test("test if onLogin works correctly", ()=>{
        topView = new TopView();
        expect(topView.logoutLabel.hidden).toBe(true);
        expect(topView.isLoggedIn).toBe(false);

        topView.onLogin();

        expect(topView.isLoggedIn).toBe(true);

        //gui

        expect(topView.logoutLabel.hidden).toBe(false);

        expect(topView.passwordLabel.hidden).toBe(true);
        expect(topView.loginLabel.hidden).toBe(true);
    });

    test("test if logout works correctly", ()=>{
        topView = new TopView();

        topView.onLogin();
        topView.onLogout();

        expect(topView.logoutLabel.hidden).toBe(true);
        expect(topView.isLoggedIn).toBe(false);

        //gui

        expect(topView.logoutLabel.hidden).toBe(true);

        expect(topView.passwordLabel.hidden).toBe(false);
        expect(topView.loginLabel.hidden).toBe(false);
    });
});