import './style.css';
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/TabSeparator.js";

import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents/dist/Panel.js";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents-fiori/dist/Timeline.js";

//Icons
import "@ui5/webcomponents-icons/dist/AllIcons.js";

import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js"
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js"
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/MenuItem.js";
import "@ui5/webcomponents/dist/Link";
import { getJSON } from "/util.js";



let midFullScreen = false;
let endFullScreen = false;
let mainInfos = {};
let projectInfos = {};

getInitialSetup();


function getInitialSetup() {

    getJSON("./models/education.json", function (data) {
        getEducationItems(data)
    }, function (error) { })

    getJSON("./models/mainInfo.json", function (data) {
        getMainInfo(data)
    }, function (error) { })

    getJSON("./models/projects.json", function (data) {
        getProjektItems(data)
    }, function (error) { })

}


function updateProductInfo(item) {
    compImgID.src = projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).logo;

    col2title.textContent = item.textContent;
    lblName.innerHTML = "<b>" + item.textContent + "</b>";
    lblDesc.innerHTML = "<b>" + item.description + "</b>";
    lblDuration.innerHTML = "<b>" + projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).duration; + "</b>";
    lblWebsite.innerHTML = "<b>" + projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).website; + "</b>";

    aWebsite.href = projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).website;


    activitiesLbl.innerHTML = "<b>" + projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).activitiesLbl; + "</b>";

    activitiesContent.innerHTML = projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).activitiesContent;
}
function updateDetailInfo(item) {
    col3title.textContent = item.textContent;
}
function nextLayout(target) {
    let layout = fcl.layout;
    if (target === "col1") {
        exitFullScreen();
        return "TwoColumnsMidExpanded";
    }
    if (target === "col2") {
        if (midFullScreen) {
            enterFullScreen();
            return "EndColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsMidExpanded";
    }
    if (target === "col2close") {

        enterFullScreen();

        return "OneColumn";
    }
    if (target === "col2fullscreen") {
        if (!midFullScreen) {
            enterFullScreen();
            return "MidColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsMidExpandedEndHidden";
    }
}

function enterFullScreen() {
    endFullScreen = true;
    midFullScreen = true;
    fullscreenMidColumn.icon = "exit-full-screen";
    fullscreenEndColumn.icon = "exit-full-screen";
}
function exitFullScreen() {
    endFullScreen = false;
    midFullScreen = false;
    fullscreenMidColumn.icon = "full-screen";
    fullscreenEndColumn.icon = "full-screen";
}
// Event handlers
col1list.addEventListener("item-click", function (e) {
    updateProductInfo(e.detail.item);
    fcl.layout = nextLayout("col1");
});




closeMidColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col2close");
});
fullscreenMidColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col2fullscreen");
});

btnOpenBasic.addEventListener("click", function (event) {
    myPopover1.showAt(btnOpenBasic);
});

myList1.addEventListener("item-click", function (e) {
    if (e.detail.item.id === "download") {
        window.open(mainInfos.cvDownload);
    } else if (e.detail.item.id === "mail") {
        window.open("mailto:" + mainInfos.mail);
    }
});

function getMainInfo(data) {
    mainInfos = data;

    getAboutMe();
    getContactDetails();
}

function getProjektItems(data) {
    projectInfos = data;
    for (let i = 0; i < projectInfos.length; i++) {
        let ui5ListItem = document.createElement("ui5-li");
        ui5ListItem.innerHTML = projectInfos[i].name;
        ui5ListItem.description = projectInfos[i].desc;
        ui5ListItem.icon = "slim-arrow-right";
        ui5ListItem.iconEnd = true
        ui5ListItem.additionalText = projectInfos[i].additionalText;
        col1list.appendChild(ui5ListItem);
    }

}

function getEducationItems(data) {
    for (let i = 0; i < data.length; i++) {
        let ui5ListItem = document.createElement("ui5-li");
        ui5ListItem.innerHTML = data[i].uni;
        ui5ListItem.description = data[i].degree;
        ui5ListItem.image = data[i].img;
        educationList.appendChild(ui5ListItem);
    }
}

function getAboutMe() {
    aboutMeText.innerHTML = mainInfos.aboutMeText;
}

function getContactDetails() {

    emailLink.href = "mailto:" + mainInfos.mail;
    emailLink.innerHTML = mainInfos.mail;
    phoneNr.href = "tel:" + mainInfos.phone;
    phoneNr.innerHTML = mainInfos.phone;
    maps.innerHTML = mainInfos.location;
}