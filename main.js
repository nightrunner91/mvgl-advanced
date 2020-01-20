var completedBody = getTableElements("tbody", "Completed");
var completedRows = getTableElements("tr", "Completed");

var planBody = getTableElements("tbody", "Plan to Play");
var planRows = getTableElements("tr", "Plan to Play");

function searchTargetHeading(selector, text) {
  var elements = [].slice.call(document.querySelectorAll(selector));
  return elements.filter(x => RegExp(text).test(x.textContent));
}

function getNextSibling(elem, selector) {
  var sibling = elem.nextElementSibling;
  if (!selector) {
    return sibling;
  }
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
}

function getTableElements(elem, title) {
  var targetHeader = searchTargetHeading("h4", title)[0];
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
  for (let index = 0; index < completedRows.length; index++) {
    var rowRating = completedRows[index].children[2].textContent;
    completedRows[index].classList.add("rated--" + rowRating);
  }

  for (let index = 0; index < planRows.length; index++) {
    var rowPriority = planRows[index].children[4].textContent;

    switch (rowPriority) {
      case "Low": {
        planRows[index].classList.add("rated--1");
        break;
      }

      case "Medium": {
        planRows[index].classList.add("rated--2");
        break;
      }

      case "High": {
        planRows[index].classList.add("rated--3");
        break;
      }

      default: {
        planRows[index].classList.add("rated--4");
      }
    }
  }
}

function placeCarrets() {
  var sortByRating = document.createElement("i");
  sortByRating.classList.add("caret", "rating");

  var sortByPriority = document.createElement("i");
  sortByPriority.classList.add("caret", "priority");

  completedRows[0].children[2].appendChild(sortByRating);
  planRows[0].children[4].appendChild(sortByPriority);
}

function placePlus() {
  var targets = [];

  var targetCurr = searchTargetHeading("h4", "Currently Playing")[0];
  var targetCont = searchTargetHeading("h4", "Continuously Playing")[0];
  var targetCompl = searchTargetHeading("h4", "Completed")[0];
  var targetHold = searchTargetHeading("h4", "On-Hold")[0];
  var targetDrop = searchTargetHeading("h4", "Dropped")[0];
  var targetPlan = searchTargetHeading("h4", "Plan to Play")[0];

  if (targetCurr != undefined) targets.push(targetCurr);
  if (targetCont != undefined) targets.push(targetCont);
  if (targetCompl != undefined) targets.push(targetCompl);
  if (targetHold != undefined) targets.push(targetHold);
  if (targetDrop != undefined) targets.push(targetDrop);
  if (targetPlan != undefined) targets.push(targetPlan);

  for (let index = 0; index < targets.length; index++) {
    targets[index].classList.add("spoiler");
    targets[index].innerHTML += '<i class="caret"></i>';
  }
}

function replaceIcons() {
  var targetIcons = document.querySelectorAll(".fa-file-text-o");

  for (let index = 0; index < targetIcons.length; index++) {
    targetIcons[index].classList.remove("fa-file-text-o");
    targetIcons[index].classList.add("fa-sticky-note");
  }
}

function sortRows(scope) {
  var tbodyClassname;

  if (scope == "rating") {
    tbodyClassname = completedBody.className;
  } else if (scope == "priority") {
    tbodyClassname = planBody.className;
  }

  switch (tbodyClassname) {
    case "tbody--normal": {
      sortAscending(scope);
      break;
    }
    case "tbody--reverse": {
      sortDescending(scope);
      break;
    }
    default: {
      sortDefault(scope);
    }
  }
}

function sortDefault(scope) {
  if (scope == "rating") {
    completedBody.classList.add("tbody--normal");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[2].classList.add("sortable");
    }
  } else if (scope == "priority") {
    planBody.classList.add("tbody--normal");
    for (let index = 0; index < planRows.length; index++) {
      planRows[index].children[4].classList.add("sortable");
    }
  }
}

function sortAscending(scope) {
  if (scope == "rating") {
    completedBody.classList.remove("tbody--normal");
    completedBody.classList.add("tbody--reverse");
    document.querySelector("th .rating").classList.add("caret--flipped");
  } else if (scope == "priority") {
    planBody.classList.remove("tbody--normal");
    planBody.classList.add("tbody--reverse");
    document.querySelector("th .priority").classList.add("caret--flipped");
  }
}

function sortDescending(scope) {
  if (scope == "rating") {
    completedBody.classList.remove("tbody--reverse");
    completedBody.classList.add("tbody--normal");
    document.querySelector("th .rating").classList.remove("caret--flipped");
  } else if (scope == "priority") {
    planBody.classList.remove("tbody--reverse");
    planBody.classList.add("tbody--normal");
    document.querySelector("th .priority").classList.remove("caret--flipped");
  }
}

function spoilerTable(event) {
  var targetSpoiler = event.target;
  var targetTable = getNextSibling(event.target, ".table");

  targetSpoiler.classList.toggle("changed");
  targetTable.classList.toggle("hidden");
}

prepareRows();
placeCarrets();
placePlus();
replaceIcons();

document.querySelector("th .rating").addEventListener("click", function() {
  sortRows("rating");
});

document.querySelector("th .priority").addEventListener("click", function() {
  sortRows("priority");
});

var spoliers = document.querySelectorAll(".spoiler");

for (let index = 0; index < spoliers.length; index++) {
  spoliers[index].addEventListener("click", spoilerTable);
}
