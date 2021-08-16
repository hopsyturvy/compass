var compass = document.getElementById("compass")
var background = document.getElementById("background")
background.addEventListener("click",resetArrows)

var flavours = [
    {
        name: "beefy",
        coordX: -390,
        coordY: -390,

    }, {
        name: "muted",
        coordX: 5,
        coordY: 500,
    }, {
        name: "dry",
        coordX: 490,
        coordY: -30,
    }, {
        name: "vegetal",
        coordX: -490,
        coordY: 50,
    }
]

var element = document.createElement('style'), sheet;
document.head.appendChild(element);
sheet = element.sheet;

flavours.forEach(addFlavour, this)


function addFlavour (properties) {
    let newflavour = document.createElementNS("http://www.w3.org/2000/svg", "g");
    newflavour.setAttribute("id", properties.name)

    let flavourtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
    flavourtext.setAttribute("x", properties.coordX)
    flavourtext.setAttribute("y", properties.coordY)
    flavourtext.setAttribute("class", "small")
    flavourtext.setAttribute("dominant-baseline", "middle")
    flavourtext.setAttribute("text-anchor", "middle")
    flavourtext.setAttribute("pointer-events", "none")
    flavourtext.innerHTML= properties.name

    let container = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    container.setAttribute("cx", properties.coordX)
    container.setAttribute("cy", properties.coordY)
    container.setAttribute("r", 50)
    container.setAttribute("stroke", "#000")
    container.setAttribute("stroke-width", 1)
    container.setAttribute("fill", "white")

    let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");

    angle = Math.atan2(-properties.coordY, -properties.coordX)* (180 / Math.PI)
    transformation = "translate(" + properties.coordX + "," + properties.coordY + ") rotate(" + angle + ")"

    arrow.setAttribute("d", "M 50 -3 H 100 L 100 -10 Q 107 -3 115 0 Q 107 3 100 10 L 100 3 L 50 3 Z")
    arrow.setAttribute("transform", transformation)
    arrow.setAttribute("fill-opacity", "0")
    arrow.setAttribute("id", properties.name + "arrow")
    arrow.setAttribute("pointer-events", "none")
    arrow.setAttribute("class", "arrow")

    let arrowtext1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    arrowtext1.setAttribute("x", properties.coordX - 5)
    
    // set text position

    if (properties.coordY > 0) {
        arrowtext1.setAttribute("y", properties.coordY + 50)
    } else {
        arrowtext1.setAttribute("y", properties.coordY - 50)
    }

    // choose wording

    if (angle > -22.5 && angle < 112.5) {
        text1 = "Less Coffee"

    } else if (angle < -67.5 || angle > 157.5) {
        text1 = "More Coffee"

    } else {
        text1 = ""
    }



    arrowtext1.setAttribute("class", "arrowtext")
    arrowtext1.setAttribute("class", "arrowtext")
    arrowtext1.setAttribute("dominant-baseline", "middle")
    arrowtext1.setAttribute("text-anchor", "end")
    arrowtext1.setAttribute("pointer-events", "none")
    arrowtext1.setAttribute("fill-opacity", "0")
    arrowtext1.setAttribute("id", properties.name + "arrowtext1")
    arrowtext1.innerHTML= text1




    let arrowtext2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    arrowtext2.setAttribute("x", properties.coordX + 5)
    
    // set text position

    if (properties.coordY > 0) {
        arrowtext2.setAttribute("y", properties.coordY + 50)
    } else {
        arrowtext2.setAttribute("y", properties.coordY - 50)
    }

    // choose wording

    if (angle > 112.5 || angle < -112.5) {
        text2 = "Extract Less"
    } else if (angle > -67.5 && angle < 67.5) {
        text2 = "Extract More"
    } else {
        text2 = ""
    }

    arrowtext2.setAttribute("class", "arrowtext")
    arrowtext2.setAttribute("dominant-baseline", "middle")
    arrowtext2.setAttribute("text-anchor", "start")
    arrowtext2.setAttribute("pointer-events", "none")
    arrowtext2.setAttribute("fill-opacity", "0")
    arrowtext2.setAttribute("id", properties.name + "arrowtext2")
    arrowtext2.innerHTML= text2

    

    newflavour.appendChild(container)
    newflavour.appendChild(flavourtext)
    newflavour.appendChild(arrow)
    newflavour.appendChild(arrowtext1)
    newflavour.appendChild(arrowtext2)
    newflavour.addEventListener("click", click)
    compass.appendChild(newflavour)
}








var panZoomCompass = svgPanZoom('#compass');
panZoomCompass.center



function click (e) {
    resetArrows()
    sheet.insertRule('.svg-pan-zoom_viewport {transition: transform 0.5s ease;}', 0);

    let arrowname = e.target.parentNode.id + "arrow"
    let thisarrow = document.getElementById(arrowname)
    thisarrow.setAttribute("fill-opacity", "1")

    let arrowtext1name = e.target.parentNode.id + "arrowtext1"
    let thistext1 = document.getElementById(arrowtext1name)
    thistext1.setAttribute("fill-opacity", "1")

    let arrowtext2name = e.target.parentNode.id + "arrowtext2"
    let thistext2 = document.getElementById(arrowtext2name)
    thistext2.setAttribute("fill-opacity", "1")

    let panX = (500 - e.target.cx.baseVal.value)*.6
    let panY = (500 - e.target.cy.baseVal.value)*.6
    // zoom is measured in px - width in px over viewport width = 600/1000 = .6


    panZoomCompass.zoom(1)
    panZoomCompass.pan({x: panX, y: panY})
    panZoomCompass.zoom(2)

    setTimeout(function(){ sheet.deleteRule(0); }, 500);

    
}

function resetArrows () {
    let arrows = document.getElementsByClassName("arrow")
    for (var i=0; i<arrows.length; i++) {
        arrows[i].setAttribute("fill-opacity", "0")
    }

    let arrowtexts = document.getElementsByClassName("arrowtext")
    for (var i=0; i<arrowtexts.length; i++) {
        arrowtexts[i].setAttribute("fill-opacity", "0")
    }


}