// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
	e.preventDefault();
	let value = grocery.value;
	let id = new Date().getTime().toString();
	if (value !== "" && editFlag === false) {
		console.log("adding");

		//creating the list element
		const element = document.createElement("article");
		element.setAttribute("data-id", id);
		element.classList.add("grocery-item");
		element.innerHTML = `<p class="title">${value}</p>
                           <div class="btn-container">
            <button type="button" class="btn-edit">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn-delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

		//adding listeners to the buttons in list element
		const deleteBtn = element.querySelector(".btn-delete");
		deleteBtn.setAttribute("data-delete-id", id);
		deleteBtn.addEventListener("click", deleteItem);

		const editBtn = element.querySelector(".btn-edit");
		editBtn.setAttribute("data-edit-id", id);
		editBtn.addEventListener("click", editItem);

		list.appendChild(element);
		container.style.visibility = "visible";

		displayAlert("value added", "success");
	} else if (value !== "" && editFlag === true) {
		let element = "[data-id='" + editId + "']";
		let groceryItem = document.querySelector(element);
		groceryItem.children[0].innerText = value;
		editFlag = false;
		editId = "";
		displayAlert("value edited", "success");
	} else {
		console.log("nothing");
	}
	resetGrocery();
}

function deleteItem(e) {
	console.log("deleting item" + e.currentTarget.dataset.deleteId);
	let selector = "[data-id='" + e.currentTarget.dataset.deleteId + "']";
	let groceryItem = document.querySelector(selector);
	groceryItem.remove();
	displayAlert("item deleted", "danger");
}

function editItem(e) {
	console.log("editing item" + e.currentTarget.dataset.editId);
	let selector = "[data-id='" + e.currentTarget.dataset.editId + "']";
	let groceryItem = document.querySelector(selector);
	grocery.value = groceryItem.children[0].innerText;
	editFlag = true;
	editId = e.currentTarget.dataset.editId;
}

function resetGrocery() {
	grocery.value = "";
}

function displayAlert(text, action) {
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);

	setTimeout(() => {
		alert.textContent = "";
		alert.classList.remove(`alert-${action}`);
	}, 1000);
}

function clearItems() {
	let items = document.querySelectorAll(".grocery-item");
	console.log(items);
	//since items is nodelist, we can either use foreach, or convert the nodelist to array
	if (items.length > 0) {
		[...items].map(function (elem) {
			elem.remove();
		});
		container.style.visibility = "hidden";
	}
}

//additional functions
