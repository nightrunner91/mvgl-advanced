var targetBody = getTableElements("tbody");
var targetRows = getTableElements("tr");

function searchTargetHeading(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

function getNextSibling(elem, selector) {
  var sibling = elem.nextElementSibling;
  if (!selector) return sibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
}

function getTableElements(elem) {
  var targetHeader = searchTargetHeading("h4", "Completed")[0];
  var targetTable = getNextSibling(targetHeader, ".table");
  var targetTb = targetTable.getElementsByTagName("tbody")[0];
  var targetTr = targetTable.getElementsByTagName("tr");

  if (elem == "header") {
    return targetHeader;
  }
  if (elem == "table") {
    return targetTable;
  }
  if (elem == "tbody") {
    return targetTb;
  }
  if (elem == "tr") {
    return targetTr;
  }
}

function prepareRows() {
  for (let index = 0; index < targetRows.length; index++) {
    var rowRating = targetRows[index].children[2].textContent;
    targetRows[index].classList.add("rated--" + rowRating);
  }
}

function makeSortButton() {
  var sortButton = document.createElement("i");
  sortButton.classList.add("caret");
  targetRows[0].children[2].appendChild(sortButton);
}

function sortRows() {
  var tbodyClassname = targetBody.className;

  switch (tbodyClassname) {
    case "tbody--normal":
      targetBody.classList.remove("tbody--normal");
      targetBody.classList.add("tbody--reverse");
      document.querySelector("th .caret").classList.add("caret--flipped");
      break;
    case "tbody--reverse":
      targetBody.classList.remove("tbody--reverse");
      targetBody.classList.add("tbody--normal");
      document.querySelector("th .caret").classList.remove("caret--flipped");
      break;
    default:
      targetBody.classList.add("tbody--normal");
  }

  for (let index = 0; index < targetRows.length; index++) {
    targetRows[index].children[2].classList.add("sortable");
  }
}

prepareRows();
makeSortButton();

document.querySelector("th .caret").addEventListener("click", sortRows);