// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// starts the program, all function calls trace back here
function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	// A9. Get recipes from localStorage.
	// If nun saved yet, return an empty array.
	return JSON.parse(localStorage.getItem("recipes")) || [];
}

function addRecipesToDocument(recipes) {
	// A10. Get <main>
	const main = document.querySelector("main");

	// SO THAT cards dont duplicate
	main.innerHTML = "";

	// A11. Create and append one <recipe-card> per recipe
	recipes.forEach((recipe) => {
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipe;
		main.append(recipeCard);
	});
}

function saveRecipesToStorage(recipes) {
	// B1. Save recipes array to localStorage as a string
	localStorage.setItem("recipes", JSON.stringify(recipes));
}

function initFormHandler() {
	// B2. Get form
	const form = document.querySelector("form");

	// A safety check in case form is hidden/missing
	if (!form) return;

	// B3. Listen for submit
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		// B4. Create FormData from form
		const formData = new FormData(form);

		// B5. Convert FormData into recipeObject
		const recipeObject = {};
		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		// Optional: convert number fields from strings to numbers
		recipeObject.rating = Number(recipeObject.rating);
		recipeObject.numRatings = Number(recipeObject.numRatings);

		// B6. Create new recipe-card
		const recipeCard = document.createElement("recipe-card");

		// B7. Add data to recipe-card
		recipeCard.data = recipeObject;

		// B8. Append card to main
		const main = document.querySelector("main");
		main.append(recipeCard);

		// B9. Save new recipe to localStorage
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		// CLEAR form after submit
		form.reset();
	});

	// B10. Get Clear Local Storage button
	const clearButton = document.querySelector("button.danger");

	// Safety check
	if (!clearButton) return;

	// B11. Add click listener
	clearButton.addEventListener("click", () => {
		// B12. Clear localStorage
		localStorage.clear();

		// B13. Delete contents of main
		const main = document.querySelector("main");
		main.innerHTML = "";
	});
}