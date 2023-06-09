
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  let params = new URLSearchParams(search);
  console.log(params.get("city"));
  return params.get("city");

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
   try{
    const res = await fetch(
      config.backendEndpoint + `/adventures/?city=${city}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    const elem = document.createElement("div");
    elem.className = "col-6 col-lg-3 mb-4 position-relative";
    elem.innerHTML = `
                    <a href="detail/?adventure=${key.id}" id=${key.id}>
                      <div class="category-banner">${key.category}</div>
                      <div class="activity-card">
                        <img 
                          class"img-responsive"
                          src=${key.image} 
                        /> 
                        <div class="activity-card-text text-md-center w-100 mt-3">
                          <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                            <h5 class="text-left">${key.name}</h5>
                            <p>₹${key.costPerHead}</p>
                          </div>
                          <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
                            <h5 class="text-left">Duration</h5>
                            <p>${key.duration} Hours</p>
                          </div>
                        </div>
                      </div>
                    </a>`;
    document.getElementById("data").append(elem);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((key) => key.duration > low && key.duration <= high);
}
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.




//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((key) => categoryList.includes(key.category));
}


//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs

  let filteredlist = list;

  if (null != filters.duration && filters.duration !== "") {
    const [low, high] = filters.duration.split("-");
    filteredlist = filterByDuration(list, parseInt(low), parseInt(high));
  }
  if (null != filters.category && filters.category.length !== 0) {
    filteredlist = filterByCategory(filteredlist, filters.category);
  }
  return filteredlist;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
   // Place holder for functionality to work in the Stubs
  const filtersString = localStorage.getItem("filters") ;
  if(null != filtersString){
    return JSON.parse(filtersString)
  }
  return null;
}
//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  document.getElementById("category-list").textContent = "";
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  filters.category.forEach((category) => {
    let pillElem = document.createElement("div");
    pillElem.className = "category-filter";
    pillElem.innerHTML = `<div>${category}</div>`;
    document.getElementById("category-list").appendChild(pillElem);
  });

  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
