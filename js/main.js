let themeImg = document.querySelector(".top .theme");

let inputTask = document.getElementById("input");

let tasksContainer = document.querySelector(".container .box .tasks");

let boxBottom = document.querySelector(".box .box-bottom");

let itemsNumber = document.querySelector(".box .box-bottom .items-number span");

let listDesktop = document.querySelectorAll(
  ".box .box-bottom .list-desktop li"
);

let clear = document.querySelector(".box .box-bottom .clear");

let tasksArray = [];

themeImg.addEventListener("click", () => {
  if (themeImg.getAttribute("src") === "./images/icon-sun.svg") {
    // Light Theme
    themeImg.setAttribute("src", "./images/icon-moon.svg");

    document.body.classList.remove("dark");
    document.body.classList.add("light");

    document.documentElement.style.setProperty(
      "--body-background",
      "hsl(0, 0%, 98%)"
    );

    document.documentElement.style.setProperty(
      "--background",
      "hsl(0, 0%, 98%)"
    );

    document.documentElement.style.setProperty(
      "--border-color",
      "hsl(236, 33%, 92%)"
    );

    document.documentElement.style.setProperty(
      "--text-color",
      "hsl(235, 19%, 35%)"
    );

    document.documentElement.style.setProperty(
      "--text-color-hover",
      "hsl(235, 19%, 35%)"
    );

    document.documentElement.style.setProperty(
      "--color-completed",
      "hsl(233, 11%, 84%)"
    );

    document.documentElement.style.setProperty(
      "--color-list",
      "hsl(236, 9%, 61%)"
    );
  } else {
    // Dark Theme
    themeImg.setAttribute("src", "./images/icon-sun.svg");

    document.body.classList.remove("light");
    document.body.classList.add("dark");

    document.documentElement.style.setProperty(
      "--body-background",
      "hsl(235, 21%, 11%)"
    );

    document.documentElement.style.setProperty(
      "--background",
      "hsl(235, 24%, 19%)"
    );

    document.documentElement.style.setProperty(
      "--border-color",
      "hsl(237, 14%, 26%)"
    );

    document.documentElement.style.setProperty(
      "--text-color",
      "hsl(234, 39%, 85%)"
    );

    document.documentElement.style.setProperty(
      "--text-color-hover",
      "hsl(233, 14%, 35%)"
    );

    document.documentElement.style.setProperty(
      "--color-completed",
      "hsl(236, 33%, 92%)"
    );

    document.documentElement.style.setProperty(
      "--color-list",
      "hsl(234, 11%, 52%)"
    );
  }
});

inputTask.focus();

getData();

function getData() {
  if (localStorage.getItem("Tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("Tasks"));
    addToPage(tasksArray);
  }

  if (tasksArray.length !== 0) {
    boxBottom.style.display = "flex";
  } else {
    boxBottom.style.display = "none";
  }
}

document.onkeyup = function (e) {
  if (e.key === "Enter") {
    if (inputTask.value !== "") {
      let taskClone = {
        id: (Math.floor(Math.random() * 100) * Date.now()).toString(),
        text: inputTask.value,
        completed: false,
      };

      inputTask.value = "";

      tasksArray.push(taskClone);

      boxBottom.style.display = "flex";

      localStorage.setItem("Tasks", JSON.stringify(tasksArray));

      addToPage(tasksArray);
    }
    inputTask.focus();
  }
};

function addToPage(tasksArray) {
  tasksContainer.innerHTML = "";

  tasksArray.forEach((elt) => {
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("data-id", elt.id);
    taskDiv.className = elt.completed ? "task completed" : "task";

    let circleDiv = document.createElement("div");
    circleDiv.className = "circle";

    let taskName = document.createElement("p");
    taskName.className = " task-name";
    taskName.appendChild(document.createTextNode(elt.text));

    let crossImg = document.createElement("img");
    crossImg.setAttribute("src", "./images/icon-cross.svg");
    crossImg.className = "cross";

    taskDiv.appendChild(circleDiv);
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(crossImg);

    let taskNotCompleted = JSON.parse(localStorage.getItem("Tasks")).filter(
      (elt) => elt.completed === false
    );
    itemsNumber.innerHTML = taskNotCompleted.length;

    tasksContainer.appendChild(taskDiv);
  });
}

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cross")) {
    task = e.target.parentElement.getAttribute("data-id");
    tasksArray = tasksArray.filter((item) => item.id !== task);
    e.target.parentElement.remove();
    if (tasksArray.length === 0) {
      boxBottom.style.display = "none";
    }
  }

  if (
    e.target.classList.contains("circle") ||
    e.target.classList.contains("task-name")
  ) {
    e.target.parentElement.classList.toggle("completed");

    let idTask = e.target.parentElement.getAttribute("data-id");
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].id === idTask) {
        tasksArray[i].completed =
          tasksArray[i].completed === true ? false : true;
      }
    }

    listDesktop.forEach((li) => {
      if (li.className === "active") {
        if (li.getAttribute("id") === "task-active") {
          let arrayClone = tasksArray.filter((elt) => elt.completed === false);
          addToPage(arrayClone);
        } else if (li.getAttribute("id") === "task-completed") {
          let arrayClone = tasksArray.filter((elt) => elt.completed === true);
          addToPage(arrayClone);
        } else {
          addToPage(tasksArray);
        }
      }
    });
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("completed");

    let idTask = e.target.getAttribute("data-id");
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].id === idTask) {
        tasksArray[i].completed =
          tasksArray[i].completed === true ? false : true;
      }
    }

    listDesktop.forEach((li) => {
      if (li.className === "active") {
        if (li.getAttribute("id") === "task-active") {
          let arrayClone = tasksArray.filter((elt) => elt.completed === false);
          addToPage(arrayClone);
        } else if (li.getAttribute("id") === "task-completed") {
          let arrayClone = tasksArray.filter((elt) => elt.completed === true);
          addToPage(arrayClone);
        } else {
          addToPage(tasksArray);
        }
      }
    });
  }

  localStorage.setItem("Tasks", JSON.stringify(tasksArray));

  let taskNotCompleted = JSON.parse(localStorage.getItem("Tasks")).filter(
    (elt) => elt.completed === false
  );
  itemsNumber.innerHTML = taskNotCompleted.length;
});

listDesktop.forEach((li) => {
  li.addEventListener("click", (e) => {
    listDesktop.forEach((elt) => {
      elt.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    if (e.currentTarget.getAttribute("id") === "task-active") {
      let arrayClone = tasksArray.filter((elt) => elt.completed === false);
      addToPage(arrayClone);
    } else if (e.currentTarget.getAttribute("id") === "task-completed") {
      let arrayClone = tasksArray.filter((elt) => elt.completed === true);
      addToPage(arrayClone);
    } else {
      addToPage(tasksArray);
    }
  });
});

clear.addEventListener("click", () => {
  tasksArray = tasksArray.filter((task) => task.completed === false);
  localStorage.setItem("Tasks", JSON.stringify(tasksArray));
  listDesktop.forEach((li) => {
    if (li.className === "active") {
      if (li.getAttribute("id") === "task-active") {
        let arrayClone = tasksArray.filter((elt) => elt.completed === false);
        addToPage(arrayClone);
      } else if (li.getAttribute("id") === "task-completed") {
        let arrayClone = tasksArray.filter((elt) => elt.completed === true);
        addToPage(arrayClone);
      } else {
        addToPage(tasksArray);
      }
    }
  });
  if (tasksArray.length === 0) {
    boxBottom.style.display = "none";
  }
});
