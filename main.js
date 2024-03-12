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
import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `

// `


// setupCounter(document.querySelector('#counter'));


let midFullScreen = false;
let endFullScreen = false;
let projectInfos = [
    {
        name: "Bell Food Group AG",
        logo: "logo-bell.jpg",
        duration: "08/2023 - Still",
        website: "https://www.bellfoodgroup.com/en/",
        activitiesLbl: "Fullstack SAP Developer",
        activitiesContent: "Development (ABAP OO), oData Gateway Services, CDS Views, RAP Model and conceptualisation in SAP Freestyle UI5 Application <br> Quality assurance of coding <br> Development of technical solutions <br> Support in development and testing activities <br> Technical consulting in SAP EWM"
    },
    {
        name: "HORSCH Maschinen GmbH",
        logo: "logo-horsch.jpg",
        duration: "10/2023 - Still",
        website: "https://www.horsch.com",
        activitiesLbl: "Fullstack SAP Developer",
        activitiesContent: "Development (ABAP OO), oData Gateway Services, CDS Views, RAP Model and conceptualisation in SAP Freestyle UI5 Application <br> Quality assurance of coding <br> Development of technical solutions <br> Support in development and testing activities <br> Technical consulting in SAP EWM"
    },
    {
        name: "HEINRICH KIPP WERK GmbH & Co. KG",
        logo: "logo-kipp.png",
        duration: "09/2021 - 05/2023",
        website: "https://www.kippwerk.de",
        activitiesLbl: "Fullstack SAP Developer",
        activitiesContent: "Development (ABAP OO), oData Gateway Services, CDS Views, RAP Model and conceptualisation in SAP Freestyle UI5 Application <br> Quality assurance of coding <br> Development of technical solutions <br> Support in development and testing activities <br> Technical consulting in SAP EWM"
    },
    {
        name: "BASF SE",
        logo: "logo-basf.png",
        duration: "09/2021 - 05/2023",
        website: "https://www.basf.com",
        activitiesLbl: "Abap Developer",
        activitiesContent: "Development (ABAP OO) <br> Smartform Development <br> Zebra Label Printer calibration"
    },
    {
        name: "CarrefourSA",
        logo: "logo-carrefour.png",
        duration: "February 2018 - July 2018",
        website: "https://www.carrefoursa.com/",
        activitiesLbl: "Abap Developer",
        activitiesContent: "Further development and support of internal reporting. BADI / user exit designs, mail transfer developments. Data loading from SAP R/3 to SAP S/4 HANA with IDoc. Connection setup between the building, land, demand, application and contracts.        "
    },
    {
        name: "Turkcell Communication services AG",
        logo: "logo-turkcell.jpg",
        duration: "September 2017 - July 2018",
        website: "https://www.turkcell.com.tr/",
        activitiesLbl: "Abap Developer",
        activitiesContent: "Introduction of developments in the back-end and front-end of the WebIDE of SAP in addition to the mapping of the approval process of contracts. Further development and support of internal reporting. BADI / user exit designs, mail transfer developments. Data loading from Oracle to SAP HANA with PI. Connection building between the building, land, demand, application and contracts."
    },
    {
        name: "Multinet Up (Meal Ticket Service)",
        logo: "logo-multinet.png",
        duration: "April 2017 – July 2018",
        website: "https://www.turkcell.com.tr/",
        activitiesLbl: "Abap Developer",
        activitiesContent: "Automatic settlement of account statements received with sFTP/FTP the with 11 banks. Further development and support of internal reporting in FI,CO,COL,CR. Data loading from e-wallet system to SAP HANA with PI. Mail transfer development.Smartforms developments for internal reporting        "
    }
];

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

    aWebsite.href =  projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).website;

    
    activitiesLbl.innerHTML = "<b>" + projectInfos.find(function (projectItem) {
        if (projectItem.name === item.textContent) {
            return projectItem;
        }
    }).activitiesLbl; + "</b>";
    
    activitiesContent.innerHTML =   projectInfos.find(function (projectItem) {
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
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

btnOpenBasic.addEventListener("click", function(event) {
    menuBasic.showAt(btnOpenBasic);
});

downloadCv.addEventListener("click", function(event) {
    window.open("/CV.pdf");
});
