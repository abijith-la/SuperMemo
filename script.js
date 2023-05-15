let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  sessionStorage.clear();
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    var content = document.getElementById("options-sidebar");
    if (content.style.width == "30vmin") {
      this.classList.toggle("collapsible-active");
      content.style.left = "-30vmin";
      content.style.width = "0vmin";
      content.style.top = "0vmin";
      content.style.bottom = "50vmin";
    } else {
      this.classList.toggle("collapsible-active");
      content.style.left = "1vmin";
      content.style.width = "30vmin";
      content.style.top = "8vmin";
      content.style.bottom = "1vmin";
    }
  });
}

function toggleEditor() {
  var el = document.querySelector(".editor");
  el.classList.toggle("editor-toggle");
}

function showLogin() {
  var el = document.querySelector(".loginformbox");
  el.style.visibility = "visible";
  el.style.opacity = "1";
  el.style.top = "50%";
  document.querySelector(".blur").classList.toggle("bg");
}

function switchForm() {
  var el = document.querySelector(".loginformbox");
  var el2 = document.querySelector(".registerformbox");
  if (el.style.visibility == "visible") {
    el.style.visibility = "hidden";
    el.style.opacity = "0";
    el.style.top = "0%";
    el2.style.visibility = "visible";
    el2.style.opacity = "1";
    el2.style.top = "50%";
  }
  else {
    el2.style.visibility = "hidden";
    el2.style.opacity = "0";
    el2.style.top = "0%";
    el.style.visibility = "visible";
    el.style.opacity = "1";
    el.style.top = "50%";
  }
}

function closePopUp() {
  var el1 = document.querySelector(".loginformbox");
  var el2 = document.querySelector(".registerformbox");
  el1.style.visibility = "hidden";
  el1.style.opacity = "0";
  el1.style.top = "0%";
  el2.style.visibility = "hidden";
  el2.style.opacity = "0";
  el2.style.top = "0%";
  document.querySelector(".blur").classList.toggle("bg");
}

function titleSeq() {
  var el = document.querySelector(".title-seq");
  document.addEventListener("click", function () {
    el.classList.add("title-seq-end");
    el.addEventListener("animationend", function () {
      el.remove();
    })
    return 0;
  })
}

function loginSubmit() {
  var em = document.getElementById("lemail").value.trim();
  var pass = document.getElementById("lpassword").value.trim();
  var regx = /^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
  if (em == "madesh") {
    sendAlert("Madeshwaran is GOD");
    return 0;
  }

  if (em == "" || pass == "") {
    sendAlert("All fields must be filled");
    return 0;
  }
  if (regx.test(em) != true) {
    sendAlert("Enter a valid Email ID");
    return 0;
  }
  else {
    sendAlert("Logged in successfully");
    return 1;
  }
}

function registrationSubmit() {
  var em = document.getElementById("remail").value.trim();
  var username = document.getElementById("rusername").value.trim();
  var pass = document.getElementById("rpassword").value.trim();
  var cpass = document.getElementById("rconfirmpassword").value.trim();
  var regx = /^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;

  if (em == "" || pass == "" || cpass == "" || username == "") {
    sendAlert("All fields must be filled");
    return 0;
  }
  if (regx.test(em) != true) {
    sendAlert("Enter a valid Email ID");
    return 0;
  }
  if (pass != cpass) {
    sendAlert("Confirm password differs from password");
    return 0;
  }
  else {
    sendAlert("Account created successfully");
    return 1;
  }
}

function sendAlert(str) {
  var alert = document.querySelector(".alert-msg");
  var text = document.querySelector(".alert-text");
  text.textContent = str;
  alert.classList.toggle("alert-msg-send");
  setTimeout(function() {
    if (alert.classList.contains("alert-msg-send")) {
      alert.classList.remove("alert-msg-send");
    }
  }, 10000);
  alert.addEventListener("click", function() {
    if (alert.classList.contains("alert-msg-send")) {
      alert.classList.remove("alert-msg-send");
    }
  });
}


document.body.addEventListener("click", titleSeq());

window.onload = initializer();