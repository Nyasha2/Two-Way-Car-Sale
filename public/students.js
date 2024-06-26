/* Name: Nyasha Makaya
 * CS 132 CP4
 *
 * Overview: This file contains javascript code for the 
 * class of 2100 directory that allows the user to select
 * a student via a drop down menu and view the details of
 * that student
 */

(function() {
    "use strict";

    const PORT_NUMBER = 8080;
    const BASE_URL = "http://localhost:" + PORT_NUMBER;

    /**
     * this function initializes the system, and add event listeners
     * to the enter button and the back button, so that when they are 
     * clicked, views change and information is displayed
     */
    function init() {
        let startButton = document.getElementById("start-btn");
        startButton.addEventListener("click", toggleView);
        startButton.addEventListener("click", viewData);
        initNames();
        
        let backBtn = document.getElementById("back-btn");
        backBtn.addEventListener("click", () => {
            toggleView();
            qs("#info").innerHTML = '';
        });    
    }

    /**
     * This function changes the views between the home view and
     * the student details view when either of the buttons are clicked
     */
    function toggleView() {
        let homePage = document.getElementById("home-page");
        let studentView = document.getElementById("student");
        
        if (homePage.className === "hidden"){
            homePage.classList.remove("hidden");
            studentView.classList.add("hidden");
        }
        else{
            homePage.classList.add("hidden");
            studentView.classList.remove("hidden"); 
        }
    }

    /**
     * This function initializes the drop down selector
     * on the home page to allow a user to select students
     * names
     */
    function initNames() {
        let url = BASE_URL + "/student-names";
        fetch(url)
        .then(checkStatus)
        .then(function(response){
            return response.json();
        })
        .then(loadNames)
        .catch(error => console.log('Error:', error));
    }


    /**
     * This function given names, create HTML elements and add them
     * to the drop down menu on the home screen
     * @param {object} names the list of names that are in the class
     */
    function loadNames(names) {
        names.forEach(name => {
            let optionTag = document.createElement("option");
            optionTag.value = name;
            optionTag.textContent = name;
            qs("#select").appendChild(optionTag);
        });
    }

    /**
     * This function fetches the data of the selected student from the 
     * API and returns it as a json file
     */
    function viewData() {
        let selector = document.getElementById("select");
        let name = selector.options[selector.selectedIndex].value;
        let url = BASE_URL + `/students/${name}`;
        fetch(url)
        .then(checkStatus)
        .then(function(response){
            return response.json();
        })
        .then(displayInfo)
        .catch(error => console.log('Error:', error));
    }

     /**
     * This function displays the data of the selected student on the
     * screen, including name, gender and grades
     */
    function displayInfo(student) {
        const details = Object.keys(student);

        details.forEach(detail  => {
            let line = document.createElement("p");
            line.textContent = detail + ":" + student[detail];
            qs("#info").appendChild(line);
        });
    }

    /**
     * Helper function to return the Response data if successful, otherwise
     * returns an Error that needs to be caught.
     * @param {object} response - response with status to check for success/error.
     * @returns {object} - The Response object if successful, otherwise an Error that
     * needs to be caught.
     */
    function checkStatus(response) {
        if (!response.ok) { // response.status >= 200 && response.status < 300
            throw Error(`Error in request: ${response.statusText}`);
        } // else, we got a response back with a good status code (e.g. 200)
        return response; // A resolved Response object.
    }

    /**
     * returns the first elemeent matching the passed CSS selector
     * @param {string} selector 
     * @returns {object} first such element
     */
    function qs(selector) {
        return document.querySelector(selector);
    }

    init();
})();