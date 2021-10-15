// Function to convert string data to DOM element to make it supportive to be appended into DOM later.
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// Hides Parameter-input when 'JSON' is chosen
document.getElementById('jsonType').addEventListener('click', () => {

    document.getElementById('paramContainer').style.display = "none"
    document.getElementById('requestJSON').style.display = "flex"
})


// Hides JSON-input when 'Custom Parameter' is chosen
document.getElementById('custom').addEventListener('click', () => {

    document.getElementById('paramContainer').style.display = "block"
    document.getElementById('requestJSON').style.display = "none"
});


// Add more Parameter-input-areas when add button (+) is clicked by listining to 'click' event
let addParameter = document.getElementById('addParameter');
addParameter.addEventListener('click', addParam);
addedParamCount = 0;

function addParam(event) {
    let index = document.getElementById('index');
    let data = `<div class="row mb-3" id="${addedParamCount + 2}">
                    <label for="JSONtxt" class="col-sm-2 col-form-label"></label>
                    <div class="col">
                        <input type="text" id="key${addedParamCount + 2}" class="form-control" placeholder="Key">
                    </div>
                    <div class="col">
                        <input type="text" id="value${addedParamCount + 2}" class="form-control" placeholder="Value">
                    </div>
                    <button class="btn btn-primary deleteBtn" style="width: auto;">-</button>
                </div>`;

    let paramElement = getElementFromString(data);
    document.getElementById('parameteres').appendChild(paramElement);
    addedParamCount++;
    event.preventDefault();

    // Delete a Parameter-input-area when clicked on remove button (-)
    let deleteBtn = document.getElementsByClassName('deleteBtn')
    for (item of deleteBtn) {

        item.addEventListener('click', function (event) {
            event.target.parentElement.remove();
        })
    }
};


// Listen to the click event on "Submit" button
let submit = document.getElementById('submit').addEventListener('click', (event) => {

    document.getElementById('result').innerHTML = 'Please wait while we are fetching response...';
    Prism.highlightAll();
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name= 'requestType']:checked").value;
    let contentType = document.querySelector("input[name= 'contentType']:checked").value;

    // Store input into 'data' string data from 'Parameters' or 'JSON' input fields
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById(`key${i + 1}`) != undefined) {
                let key = document.getElementById(`key${i + 1}`).value;
                let value = document.getElementById(`value${i + 1}`).value;
                data[key] = value;
            }
        }
        data= JSON.stringify(data);
    }
    
    else{
        data= document.getElementById('JSONtxt').value;
    }
    
    // Envokes fetch event for 'GET' or 'POST' requests
    if (requestType=='GET') {
        fetch(url, {
            method: 'GET',
        })
        .then((response)=> response.text())
        .then((text) => {
            document.getElementById('result').innerHTML =text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body : data,
            headers : {
                "Content-type" : "application/json; charset= UTF-8"
            }
        })
        .then((response)=> response.text())
        .then((text) => {
            document.getElementById('result').innerHTML =text;
            Prism.highlightAll();
        });
    }
    event.preventDefault();
})