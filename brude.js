var wheel = document.getElementById("wheel")
var wheelcontainer = document.getElementById("wheelcontainer")
var RHoverlay = document.getElementById("RHoverlay")
var wheelangle = 0
var turnangle = 0
var isDragging = false
var dragStart = { x: 0, y: 0 }
var diffX = 0
var diffY = 0
var delta = 5
var SCROLL_SENSITIVITY = .5
var timer = null
var flavours = [
    {
        name: "Sweet",
        flavourangle: 0,
        distance: 200

    }, {
        name: "Powdery",
        flavourangle: 10,
        distance: 400
    }, {
        name: "Pleasing",
        flavourangle: 20,
        distance: 200
    }, {
        name: "Empty",
        flavourangle: 25,
        distance: 400
    }, {
        name: "Dusty",
        flavourangle: 35,
        distance: 400
    }, {
        name: "Aromatic",
        flavourangle: 40,
        distance: 280
    }, {
        name: "Astringent",
        flavourangle: 45,
        distance: 450
    }, {
        name: "Dilute",
        flavourangle: 55,
        distance: 400
    }, {
        name: "Limp",
        flavourangle: 60,
        distance: 450
    }, {
        name: "Scrawny",
        flavourangle: 70,
        distance: 400
    }, {
        name: "Delicate",
        flavourangle: 72,
        distance: 280
    }, {
        name: "Fragile",
        flavourangle: 75,
        distance: 450
    }, {
        name: "Muted",
        flavourangle: 80,
        distance: 400
    }, {
        name: "Gentle",
        flavourangle: 85,
        distance: 200
    }, {
        name: "Thin",
        flavourangle: 95,
        distance: 280
    }, {
        name: "Faint",
        flavourangle: 98,
        distance: 450
    }, {
        name: "Slender",
        flavourangle: 106,
        distance: 400
    }, {
        name: "Sparse",
        flavourangle: 112,
        distance: 450
    }, {
        name: "Transparent",
        flavourangle: 116,
        distance: 280
    }, {
        name: "Tea-Like",
        flavourangle: 118,
        distance: 400
    }, {
        name: "Flimsy",
        flavourangle: 125,
        distance: 450
    }, {
        name: "Insipid",
        flavourangle: 130,
        distance: 400
    }, {
        name: "Soft",
        flavourangle: 133,
        distance: 200
    }, {
        name: "Watery",
        flavourangle: 135,
        distance: 450
    }, {
        name: "Underwhelming",
        flavourangle: 142,
        distance: 400
    }, {
        name: "Bland",
        flavourangle: 152,
        distance: 400
    }, {
        name: "Nutty",
        flavourangle: 157,
        distance: 450
    }, {
        name: "Vegetal",
        flavourangle: 162,
        distance: 400
    }, {
        name: "Nuanced",
        flavourangle: 165,
        distance: 200
    }, {
        name: "Sour",
        flavourangle: 172,
        distance: 400
    }, {
        name: "Buttery",
        flavourangle: 188,
        distance: 280
    }, {
        name: "Salty",
        flavourangle: 191,
        distance: 400
    }, {
        name: "Substantial",
        flavourangle: 195,
        distance: 220
    }, {
        name: "Quick Finish",
        flavourangle: 203,
        distance: 400
    }, {
        name: "Plump",
        flavourangle: 210,
        distance: 280
    }, {
        name: "Dull",
        flavourangle: 214,
        distance: 400
    }, {
        name: "Sticky",
        flavourangle: 222,
        distance: 280
    }, {
        name: "Beefy",
        flavourangle: 230,
        distance: 450
    }, {
        name: "Big",
        flavourangle: 242,
        distance: 280
    }, {
        name: "Bulky",
        flavourangle: 244,
        distance: 400
    }, {
        name: "Soupy",
        flavourangle: 258,
        distance: 400
    }, {
        name: "Strong",
        flavourangle: 260,
        distance: 280
    }, {
        name: "Heavy",
        flavourangle: 270,
        distance: 200
    }, {
        name: "Hefty",
        flavourangle: 280,
        distance: 280
    }, {
        name: "Harsh",
        flavourangle: 285,
        distance: 400
    }, {
        name: "Robust",
        flavourangle: 290,
        distance: 280
    }, {
        name: "Overwhelming",
        flavourangle: 300,
        distance: 450
    }, {
        name: "Severe",
        flavourangle: 310,
        distance: 400
    }, {
        name: "Thick",
        flavourangle: 312,
        distance: 280
    }, {
        name: "Intense",
        flavourangle: 320,
        distance: 400
    }, {
        name: "Luscious",
        flavourangle: 330,
        distance: 200
    }, {
        name: "Dry",
        flavourangle: 335,
        distance: 400
    }, {
        name: "Rich",
        flavourangle: 340,
        distance: 280
    }, {
        name: "Bitter",
        flavourangle: 350,
        distance: 400
    }

]
var currentflavour


window.onload = function () {


    flavours.forEach(addFlavour, this)

    wheelcontainer.addEventListener('pointerdown', onPointerDown)
    //wheelcontainer.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
    document.addEventListener('pointerup', onPointerUp)
    //document.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
    //document.addEventListener('touchcancel', (e) => handleTouch(e, onPointerUp))
    document.addEventListener('pointermove', onPointerMove)
    //wheelcontainer.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
    wheelcontainer.addEventListener('wheel', (e) => scrollWheel(e.deltaY * SCROLL_SENSITIVITY))
    window.addEventListener("resize", resize)
    resize()
}


function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY }
    }
}

function onPointerDown(e) {
    e.preventDefault();
    isDragging = true
    dragStart.x = getEventLocation(e).x
    dragStart.y = getEventLocation(e).y
    diffX = 0
    diffY = 0

}

function onPointerUp(e) {
    e.preventDefault();
    isDragging = false
    initialPinchDistance = null
    wheelangle += turnangle
    if (wheelangle > 360) {
        wheelangle -= 360
    } else if (wheelangle < 0) {
        wheelangle += 360
    }

    if (Math.abs(diffX) > delta || Math.abs(diffY) > delta) {
        snapWheel(wheelangle)
    }
    turnangle = 0
}

function onPointerMove(e) {

    e.preventDefault();

    if (isDragging && getEventLocation(e)) {

        diffX += (getEventLocation(e).x - dragStart.x)
        diffY += (getEventLocation(e).y - dragStart.y)


        if (e.target.id == "RHoverlay") {
            turn = -(dragStart.y - getEventLocation(e).y)
        } else {
            turn = (dragStart.y - getEventLocation(e).y)
        }

        wheelTurn(turn)
    }
}

function handleTouch(e, singleTouchHandler) {
    if (e.touches.length == 1) {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2) {
        isDragging = false
        //handlePinch(e) - removed for now
    }
}

function scrollWheel(e) {
    if (!isDragging) {
        if (e) {

            wheelTurn(e)
            wheelangle += e
            if (wheelangle > 360) {
                wheelangle -= 360
            } else if (wheelangle < 0) {
                wheelangle += 360
            }


            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () { snapWheel(wheelangle) }, 350);


        }

    }
}

function wheelTurn(t) {

    if (currentflavour) { popin(currentflavour) }
    turnangle = t / Math.PI
    transformation = "rotate(" + (wheelangle + turnangle) + ")"
    if ((wheelangle + turnangle) > 360) {
        wheelangle -= 360
    } else if ((wheelangle + turnangle) < 0) {
        wheelangle += 360
    }

    wheel.setAttribute("transform", transformation)

}

function snapWheel(angle) {


    let min = 540
    let setpoint
    if (angle > 180) {
        setpoint = 540 - angle
    } else {
        setpoint = 180 - angle
    }

    let snapangle = 0

    for (let i = 0; i < flavours.length; i++) {


        min = Math.min(min, Math.abs(setpoint - flavours[i].flavourangle), Math.abs(setpoint - flavours[i].flavourangle - 360))


        if (min == Math.abs(setpoint - flavours[i].flavourangle)) {
            snapangle = setpoint - flavours[i].flavourangle
            currentflavour = flavours[i].name
        } else if (min == Math.abs(setpoint - flavours[i].flavourangle - 360)) {
            snapangle = setpoint - flavours[i].flavourangle
            currentflavour = flavours[i].name
        }

    }

    if (snapangle > 180) {
        snapangle = snapangle - 360
    }

    turnWheel(snapangle)
    setTimeout(function () { popout(currentflavour) }, 200)

}

function popout(name) {
    let popelement = document.getElementById(name + "label")
    popelement.style.transition = "transform 0.5s ease"


    let distance = - 400 - parseInt(popelement.getAttribute("x"))
    let transformation = "scale (2) translate (" + distance + ",0)"


    popelement.setAttribute("transform", transformation)

    setTimeout(function () { popelement.style.transition = "transform 0s" }, 500)

    showInfo(name)

}

function popin(name) {
    let popelement = document.getElementById(name + "label")
    popelement.style.transition = "transform 0.2s ease"

    let transformation = "scale (1)"

    popelement.setAttribute("transform", transformation)

    setTimeout(function () { popelement.style.transition = "transform 0s" }, 500)

    hideInfo()

}

function showInfo(name) {
    if (wheelangle >= 337.5 || wheelangle < 22.5) {
        resultstitle = "Extract More, Use Less Coffee"
        resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more</li><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water</li></ul>"
    } else if (wheelangle >= 22.5 && wheelangle < 67.5) {
        resultstitle = "Extract More"
        resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more</li></ul>"
    } else if (wheelangle >= 67.5 && wheelangle < 112.5) {
        resultstitle = "Use More Coffee"
        resultsinfo = "<ul><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"
    } else if (wheelangle >= 112.5 && wheelangle < 157.5) {
        resultstitle = "Extract Less, Use More Coffee"
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract more</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"
    } else if (wheelangle >= 157.5 && wheelangle < 202.5) {
        resultstitle = "Extract Less, Use More Coffee"
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract more</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"
    } else if (wheelangle >= 202.5 && wheelangle < 247.5) {
        resultstitle = "Extract Less"
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract more</li></ul>"
    } else if (wheelangle >= 247.5 && wheelangle < 292.5) {
        resultstitle = "Use Less Coffee"
        resultsinfo = "<ul><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water</li></ul>"
    } else if (wheelangle >= 292.5 && wheelangle < 337.5) {
        resultstitle = "Extract More, Use Less Coffee"
        resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more</li><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water</li></ul>"
    }

    document.getElementById("resultstitle").innerHTML = resultstitle
    document.getElementById("resultsinfo").innerHTML = resultsinfo

    results = document.getElementById("resultsarea")
    results.style.visibility = "visible"



}

function hideInfo() {
    results = document.getElementById("resultsarea")
    results.style.visibility = "hidden"
}


function turnWheel(a) {

    wheelangle += a
    transformation = "rotate(" + wheelangle + ")"


    document.getElementById("wheel").style.transition = "transform 0.5s ease"


    wheel.setAttribute("transform", transformation)

    if (wheelangle > 360) {
        wheelangle -= 360
    } else if (wheelangle < 0) {
        wheelangle += 360
    }

    setTimeout(function () {
        document.getElementById("wheel").style.transition = "transform 0s"
        //instantly resets rotation if over 360
        transformation = "rotate(" + wheelangle + ")"
        wheel.setAttribute("transform", transformation)

    }, 600)

}


function addFlavour(properties) {
    let newflavour = document.createElementNS("http://www.w3.org/2000/svg", "g");
    newflavour.setAttribute("id", properties.name)

    let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let transformation = "rotate(" + (180 + properties.flavourangle) + ")"

    label.setAttribute("x", -properties.distance)
    label.setAttribute("y", 0)
    label.setAttribute("id", properties.name + "label")
    label.setAttribute("class", "label")
    label.setAttribute("text-anchor", "start")
    label.setAttribute("data-angle", properties.flavourangle)
    label.setAttribute("data-name", properties.name)
    newflavour.setAttribute("transform", transformation)
    label.setAttribute("alignment-baseline", "center")
    label.innerHTML = properties.name

    newflavour.appendChild(label)
    wheel.appendChild(newflavour)
    newflavour.addEventListener('click', (e) => click(e))
}

function click(e) {

    console.log(e)

    if (currentflavour) { popin(currentflavour) }
    let target = 180 - parseInt(e.target.getAttribute("data-angle"))
    console.log("target = " + target)
    console.log("wheelangle = " + wheelangle)
    
    turn = target-wheelangle
    if (turn > 180) {
        turn -= 360
    } else if (turn < -180) {
        turn += 360
    }
    turnWheel(turn)
    currentflavour = e.target.getAttribute("data-name")
    popout(currentflavour)

}

function resize() {

    let titlearea = document.getElementById("titlearea")
    let resultsarea = document.getElementById("resultsarea")
    let svgheight = window.innerHeight - titlearea.clientHeight - resultsarea.clientHeight
    document.getElementById("compass").style.height = svgheight + "px"
}
