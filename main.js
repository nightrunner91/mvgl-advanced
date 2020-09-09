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

  if (targetHeader != undefined) {
    var targetTable = getNextSibling(targetHeader, ".table");
    var targetTb = targetTable.getElementsByTagName("tbody")[0];
    var targetTr = targetTable.getElementsByTagName("tr");
  }

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
  if (completedRows != undefined) {
    for (let index = 0; index < completedRows.length; index++) {
      var rowRating = completedRows[index].children[2].textContent;
      completedRows[index].classList.add("rated--" + rowRating);

      var rowHours = completedRows[index].children[3].textContent;

      switch (rowHours) {
        case " 1-2 Hours": {
          completedRows[index].classList.add("hours--12");
          break;
        }

        case " 2-3 Hours": {
          completedRows[index].classList.add("hours--11");
          break;
        }

        case " 3-4 Hours": {
          completedRows[index].classList.add("hours--10");
          break;
        }

        case " 4-5 Hours": {
          completedRows[index].classList.add("hours--9");
          break;
        }

        case " 5-10 Hours": {
          completedRows[index].classList.add("hours--8");
          break;
        }

        case " 10-20 Hours": {
          completedRows[index].classList.add("hours--7");
          break;
        }

        case " 20-30 Hours": {
          completedRows[index].classList.add("hours--6");
          break;
        }

        case " 30-40 Hours": {
          completedRows[index].classList.add("hours--5");
          break;
        }

        case " 40-50 Hours": {
          completedRows[index].classList.add("hours--4");
          break;
        }

        case " 50-75 Hours": {
          completedRows[index].classList.add("hours--3");
          break;
        }

        case " 75-100 Hours": {
          completedRows[index].classList.add("hours--2");
          break;
        }

        case " 100+ Hours": {
          completedRows[index].classList.add("hours--1");
          break;
        }
      }
    }
  }

  if (planRows != undefined) {
    for (let index = 0; index < planRows.length; index++) {
      var rowPriority = planRows[index].children[4].textContent;

      switch (rowPriority) {
        case "Low": {
          planRows[index].classList.add("priority--low");
          break;
        }

        case "Medium": {
          planRows[index].classList.add("priority--medium");
          break;
        }

        case "High": {
          planRows[index].classList.add("priority--high");
          break;
        }

        default: {
          planRows[index].classList.add("priority--none");
        }
      }
    }
  }
}

function placeCarrets() {
  if (completedRows != undefined) {
    var sortByRating = document.createElement("i");
    sortByRating.classList.add("caret", "rating");

    completedRows[0].children[2].appendChild(sortByRating);

    let rows = [];

    for (let index = 1; index < completedRows.length; index++) {
      rows.push(completedRows[index].children.length);
    }

    if (rows.some(elem => elem > 5)) {
      var headerHours = document.createElement('th');
      headerHours.innerHTML = 'Time Played';
      var sortByHours = document.createElement("i");
      sortByHours.classList.add("caret", "hours");

      insertAfter(headerHours, completedRows[0].children[2]);

      completedRows[0].children[3].appendChild(sortByHours);
    }
  }

  if (planRows != undefined) {
    var sortByPriority = document.createElement("i");
    sortByPriority.classList.add("caret", "priority");
    planRows[0].children[4].appendChild(sortByPriority);
  }
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
  var notesIcons = document.querySelectorAll(".fa-file-text-o");
  var digitalIcons = document.querySelectorAll(".fa-download");
  var piratesIcons = document.querySelectorAll(".fa-play-circle-o");

  for (let index = 0; index < notesIcons.length; index++) {
    notesIcons[index].classList.remove("fa-file-text-o");
    notesIcons[index].classList.add("fa-sticky-note");
  }

  for (let index = 0; index < digitalIcons.length; index++) {
    digitalIcons[index].classList.remove("fa-download");
    digitalIcons[index].classList.add("fa-wallet");
  }

  for (let index = 0; index < piratesIcons.length; index++) {
    piratesIcons[index].classList.remove("fa-play-circle-o");
    piratesIcons[index].classList.add("fa-skull-crossbones");
  }
}

function sortRows(scope) {
  var tbodyClassname;

  if (scope == "rating" || scope == "hours") {
    tbodyClassname = completedBody.className;
  } else if (scope == "priority") {
    tbodyClassname = planBody.className;
  }

  switch (tbodyClassname) {
    case "tbody--normal-rating":
    case "tbody--normal-hours": {
      sortAscending(scope);
      break;
    }
    case "tbody--reverse-rating":
    case "tbody--reverse-hours": {
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
    completedBody.classList.remove("tbody--normal-hours");
    completedBody.classList.add("tbody--normal-rating");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[3].classList.remove("sortable");
      completedRows[index].children[2].classList.add("sortable");
    }
  } else if (scope == "hours") {
    completedBody.classList.remove("tbody--normal-rating");
    completedBody.classList.add("tbody--normal-hours");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[2].classList.remove("sortable");
      completedRows[index].children[3].classList.add("sortable");
    }
  } else if (scope == "priority") {
    planBody.classList.add("tbody--normal-rating");
    for (let index = 0; index < planRows.length; index++) {
      planRows[index].children[4].classList.add("sortable");
    }
  }
}

function sortAscending(scope) {
  if (scope == "rating") {
    completedBody.classList.remove("tbody--normal-hours");
    completedBody.classList.remove("tbody--normal-rating");
    completedBody.classList.add("tbody--reverse-rating");
    document.querySelector("th .hours").classList.remove("caret--flipped");
    document.querySelector("th .rating").classList.add("caret--flipped");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[3].classList.remove("sortable");
      completedRows[index].children[2].classList.add("sortable");
    }
  } else if (scope == "hours") {
    completedBody.classList.remove("tbody--normal-rating");
    completedBody.classList.remove("tbody--normal-hours");
    completedBody.classList.add("tbody--reverse-hours");
    document.querySelector("th .rating").classList.remove("caret--flipped");
    document.querySelector("th .hours").classList.add("caret--flipped");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[2].classList.remove("sortable");
      completedRows[index].children[3].classList.add("sortable");
    }
  } else if (scope == "priority") {
    planBody.classList.remove("tbody--normal-rating");
    planBody.classList.add("tbody--reverse-rating");
    document.querySelector("th .priority").classList.add("caret--flipped");
  }
}

function sortDescending(scope) {
  if (scope == "rating") {
    completedBody.classList.remove("tbody--reverse-hours");
    completedBody.classList.remove("tbody--reverse-rating");
    completedBody.classList.add("tbody--normal-rating");
    document.querySelector("th .hours").classList.remove("caret--flipped");
    document.querySelector("th .rating").classList.remove("caret--flipped");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[3].classList.remove("sortable");
      completedRows[index].children[2].classList.add("sortable");
    }
  } else if (scope == "hours") {
    completedBody.classList.remove("tbody--reverse-rating");
    completedBody.classList.remove("tbody--reverse-hours");
    completedBody.classList.add("tbody--normal-hours");
    document.querySelector("th .rating").classList.remove("caret--flipped");
    document.querySelector("th .hours").classList.add("caret--flipped");
    for (let index = 0; index < completedRows.length; index++) {
      completedRows[index].children[2].classList.remove("sortable");
      completedRows[index].children[3].classList.add("sortable");
    }
  } else if (scope == "priority") {
    planBody.classList.remove("tbody--reverse-rating");
    planBody.classList.add("tbody--normal-rating");
    document.querySelector("th .priority").classList.remove("caret--flipped");
  }
}

function spoilerTable(event) {
  var targetSpoiler = event.target;
  var targetTable = getNextSibling(event.target, ".table");

  targetSpoiler.classList.toggle("changed");
  targetTable.classList.toggle("hidden");
}

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function setHours() {
  for (let index = 1; index < completedRows.length; index++) {
    if (completedRows[index].children[5] != undefined) {
      var rowModalId = completedRows[index].children[5].querySelector('[data-target]').dataset.target;
      var rowModalHours = document.querySelector(rowModalId).querySelector('.text-light').childNodes[7].textContent;
      var hoursColumn = document.createElement('td');
      hoursColumn.innerHTML = rowModalHours;
      insertAfter(hoursColumn, completedRows[index].children[2]);
    }
  }
}

setHours();
prepareRows();
placeCarrets();
placePlus();
replaceIcons();

if (document.querySelector("th .rating")) {
  document.querySelector("th .rating").addEventListener("click", function() {
    sortRows("rating");
  });
}

if (document.querySelector("th .priority")) {
  document.querySelector("th .priority").addEventListener("click", function() {
    sortRows("priority");
  });
}

if (document.querySelector("th .hours")) {
  document.querySelector("th .hours").addEventListener("click", function() {
    sortRows("hours");
  });
}

var spoliers = document.querySelectorAll(".spoiler");

for (let index = 0; index < spoliers.length; index++) {
  spoliers[index].addEventListener("click", spoilerTable);
}
