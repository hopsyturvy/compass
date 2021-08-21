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
var moved = 0
var compass = document.getElementById("compass")
var pt = compass.createSVGPoint();
var previousturn = 0

const tier = {
    a: {
        outer: 477.36,
        inner: 371.52,
        arcwidth: 2
    },
    b: {
        outer: 422.39,
        inner: 271.13,
        arcwidth: 2.5
    },
    c: {
        outer: 251.85,
        inner: 144.90,
        arcwidth: 4
    },
    d: {
        outer: 214.11,
        inner: 113.36,
        arcwidth: 5
    },
    e: {
        outer: 103.8,
        inner: 77.91,
        arcwidth: 45
    }
}

var flavours = [
    {
        name: "Sweet",
        flavourangle: 0,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Powdery",
        flavourangle: 10,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Pleasing",
        flavourangle: 20,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Empty",
        flavourangle: 25,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Dusty",
        flavourangle: 35,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Aromatic",
        flavourangle: 40,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Astringent",
        flavourangle: 45,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Dilute",
        flavourangle: 55,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Limp",
        flavourangle: 60,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Scrawny",
        flavourangle: 70,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Delicate",
        flavourangle: 72,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Fragile",
        flavourangle: 75,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Muted",
        flavourangle: 80,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Gentle",
        flavourangle: 85,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Thin",
        flavourangle: 95,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Faint",
        flavourangle: 98,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Slender",
        flavourangle: 106,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Sparse",
        flavourangle: 112,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Transparent",
        flavourangle: 116,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Tea-Like",
        flavourangle: 118,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Flimsy",
        flavourangle: 125,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Insipid",
        flavourangle: 130,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Soft",
        flavourangle: 133,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Watery",
        flavourangle: 135,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Underwhelming",
        flavourangle: 142,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Bland",
        flavourangle: 152,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Nutty",
        flavourangle: 157,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Vegetal",
        flavourangle: 162,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Nuanced",
        flavourangle: 165,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Sour",
        flavourangle: 172,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Buttery",
        flavourangle: 187,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Salty",
        flavourangle: 191,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Substantial",
        flavourangle: 198,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Quick Finish",
        flavourangle: 203,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Plump",
        flavourangle: 210,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Dull",
        flavourangle: 214,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Sticky",
        flavourangle: 222,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Beefy",
        flavourangle: 230,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    }, {
        name: "Big",
        flavourangle: 242,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Bulky",
        flavourangle: 244,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Soupy",
        flavourangle: 258,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Strong",
        flavourangle: 260,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Heavy",
        flavourangle: 270,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Hefty",
        flavourangle: 280,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Harsh",
        flavourangle: 285,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Robust",
        flavourangle: 290,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Overwhelming",
        flavourangle: 300,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Severe",
        flavourangle: 310,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Thick",
        flavourangle: 312,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Intense",
        flavourangle: 320,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Luscious",
        flavourangle: 330,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    }, {
        name: "Dry",
        flavourangle: 335,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }, {
        name: "Rich",
        flavourangle: 340,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    }, {
        name: "Bitter",
        flavourangle: 350,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }

]
var currentflavour

var core = [
    {
        name: "Mouth-Filling",
        angle: 90,
        arcwidth: 50
    }, {
        name: "Fruity",
        angle: 175,
        arcwidth: 25
    }, {
        name: "Tasty",
        angle: 230,
        arcwidth: 24
    }, {
        name: "Creamy",
        angle: 295,
        arcwidth: 28
    }, {
        name: "Smooth",
        angle: 360,
        arcwidth: 30
    }



]

window.onload = function () {


    flavours.forEach(addFlavour, this)
    core.forEach(addCore, this)

    wheelcontainer.addEventListener('mousedown', onPointerDown)
    wheelcontainer.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
    document.addEventListener('mouseup', onPointerUp)
    document.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
    document.addEventListener('touchcancel', (e) => handleTouch(e, onPointerUp))
    document.addEventListener('mousemove', onPointerMove)
    wheelcontainer.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
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

    alert_coords(e)
    if (cursorpt.x < 0) {direction = true} else {direction = false}
    previousturn = 0

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
    } else {
        click(e)
    }
    turnangle = 0

    
    if (moved == 1) {
        document.getElementById("instructions2").style.animation = "fade-in 1s 1 forwards";
        document.getElementById("instructions1").style.animation = "fade-out 1s 1 forwards";
        moved += 1
    } else if (moved == 2) {
        document.getElementById("instructions2").style.animation = "fade-out 1s 1 forwards";
        setTimeout(function () {document.getElementById("instructions").style.display = "none";}, 1000)
        moved += 1
    }
}





function onPointerMove(e) {
    
    e.preventDefault();

    if (isDragging && getEventLocation(e)) {

        diffX += (getEventLocation(e).x - dragStart.x)
        diffY += (getEventLocation(e).y - dragStart.y)

        alert_coords(e)
        

        if (cursorpt.x > 0) {
            if (direction) {
                previousturn = turn

                direction = false

                dragStart.y = getEventLocation(e).y
            }

            turn = previousturn - (dragStart.y - getEventLocation(e).y)

        } else {
            if (!direction) {
                previousturn = turn
                direction = true
                dragStart.y = getEventLocation(e).y
            }
            turn = previousturn + (dragStart.y - getEventLocation(e).y)
        }



        //document.getElementById("arrow").style.transform = "translate(-220px,0)"
        
        
        
        


        wheelTurn(turn)
    }
}



function alert_coords(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    cursorpt =  pt.matrixTransform(compass.getScreenCTM().inverse());
}

function handleTouch(e, singleTouchHandler) {
    
    if (e.touches.length < 2) {
        singleTouchHandler(e)
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
    

    document.getElementById("indicator").style.visibility = "visible"

    turnangle = t / Math.PI
    transformation = "rotate(" + (wheelangle + turnangle) + ")"
    if ((wheelangle + turnangle) > 360) {
        wheelangle -= 360
    } else if ((wheelangle + turnangle) < 0) {
        wheelangle += 360
    }

    wheel.setAttribute("transform", transformation)
    if (moved == 0) {moved = 1}

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
    if (currentflavour) {
    setTimeout(function () { popout(currentflavour) }, 200)
    }

}

function popout(name) {
    document.getElementById("indicator").style.visibility = "hidden"
    let popelement = document.getElementById(name + "label")
    popelement.style.transition = "transform 0.5s ease"
    let poparc = popelement.previousSibling
    poparc.style.transition = "transform 0.5s ease"

    let distance = - (800 / 2) + parseInt(popelement.getAttribute("data-outer-arc"))
    let transformation = "scale (2) translate (" + distance + ",0)"


    popelement.setAttribute("transform", transformation)
    poparc.setAttribute("transform", transformation)


    setTimeout(function () { popelement.style.transition = "transform 0s" }, 500)
    setTimeout(function () { poparc.style.transition = "transform 0s" }, 500)

    showInfo(popelement)

}

function popin(name) {
    let popelement = document.getElementById(name + "label")
    popelement.style.transition = "transform 0.2s ease"
    let poparc = popelement.previousSibling
    poparc.style.transition = "transform 0.2s ease"

    let transformation = "scale (1)"

    popelement.setAttribute("transform", transformation)
    poparc.setAttribute("transform", transformation)


    setTimeout(function () { popelement.style.transition = "transform 0s" }, 500)
    setTimeout(function () { poparc.style.transition = "transform 0s" }, 500)

    hideInfo()

}

function showInfo(element) {


    if (element.getAttribute("x") < -261) {

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
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"
    } else if (wheelangle >= 157.5 && wheelangle < 202.5) {
        resultstitle = "Extract Less, Use More Coffee"
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"
    } else if (wheelangle >= 202.5 && wheelangle < 247.5) {
        resultstitle = "Extract Less"
        resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less</li></ul>"
    } else if (wheelangle >= 247.5 && wheelangle < 292.5) {
        resultstitle = "Use Less Coffee"
        resultsinfo = "<ul><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water</li></ul>"
    } else if (wheelangle >= 292.5 && wheelangle < 337.5) {
        resultstitle = "Extract More, Use Less Coffee"
        resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more</li><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water</li></ul>"
    }

    } else {
        resultstitle = "Green Zone"
        if (wheelangle >= 337.5 || wheelangle < 22.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time and use less coffee"
        } else if (wheelangle >= 22.5 && wheelangle < 67.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time"
        } else if (wheelangle >= 67.5 && wheelangle < 112.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you decrease the Brew Ratio by using more coffee"
        } else if (wheelangle >= 112.5 && wheelangle < 157.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time and use more coffee"
        } else if (wheelangle >= 157.5 && wheelangle < 202.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time and use more coffee"
        } else if (wheelangle >= 202.5 && wheelangle < 247.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time"
        } else if (wheelangle >= 247.5 && wheelangle < 292.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you increase the Brew Ratio by using less coffee"
        } else if (wheelangle >= 292.5 && wheelangle < 337.5) {
            resultsinfo = "Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time and use less coffee"
        }
    }

    document.getElementById("resultstitle").innerHTML = resultstitle
    document.getElementById("resultsinfo").innerHTML = resultsinfo

    results = document.getElementById("resultsarea")
    results.style.opacity = "1"



}

function hideInfo() {
    results = document.getElementById("resultsarea")
    results.style.opacity = "0"
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

function addCore(properties) {

    let core = document.getElementById("core")

    let label = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    label.setAttribute("id", properties.name)
    label.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#textcircle")
    label.setAttribute("startOffset", properties.angle / 7.20 + "%")
    label.innerHTML = properties.name

    let transformation = "rotate(" + (properties.angle) + ")"

    let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let arcpath = describeArc(0, 0, -tier.e.inner, -tier.e.outer, -properties.arcwidth, properties.arcwidth);
    arc.setAttribute("d", arcpath)
    arc.setAttribute("fill", "#a2bcb3")

    arc.setAttribute("transform", transformation)
    wheel.insertBefore(arc, wheel.firstChild)
    core.appendChild(label)
}

function addFlavour(properties) {
    let newflavour = document.createElementNS("http://www.w3.org/2000/svg", "g");
    newflavour.setAttribute("id", properties.name)

    let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let transformation = "rotate(" + (180 + properties.flavourangle) + ")"

    let labelplace = - (properties.innerarc + properties.outerarc) / 2;

    label.setAttribute("x", labelplace)
    label.setAttribute("y", 0)
    label.setAttribute("id", properties.name + "label")
    label.setAttribute("class", "label")
    label.setAttribute("text-anchor", "middle")
    label.setAttribute("data-angle", properties.flavourangle)
    label.setAttribute("data-outer-arc", properties.outerarc)
    label.setAttribute("data-name", properties.name)
    label.setAttribute("alignment-baseline", "central")
    label.innerHTML = properties.name

    let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let arcpath = describeArc(0, 0, -properties.innerarc, -properties.outerarc, -properties.arcwidth, properties.arcwidth);
    arc.setAttribute("d", arcpath)
    arc.setAttribute("fill", "#a2bcb3")

    newflavour.appendChild(arc)
    newflavour.appendChild(label)

    newflavour.setAttribute("transform", transformation)


    wheel.appendChild(newflavour)
    //newflavour.addEventListener('click', (e) => click(e))
}

function click(e) {


    if (currentflavour) { popin(currentflavour) }



    let target = 180 - parseInt(e.target.getAttribute("data-angle"))
    currentflavour = e.target.getAttribute("data-name")

    if (!target) {
        if (!e.target.nextSibling.length){
        target = 180 - parseInt(e.target.nextSibling.getAttribute("data-angle"))
        currentflavour = e.target.nextSibling.getAttribute("data-name")
        }
        
    }

    if (target) {

    turn = target - wheelangle
    if (turn > 180) {
        turn -= 360
    } else if (turn < -180) {
        turn += 360
    }

    turnWheel(turn)
    
    popout(currentflavour)
}

}

function resize() {
    if(currentflavour){popin(currentflavour)}
    let titlearea = document.getElementById("titlearea")
    let resultsarea = document.getElementById("resultsarea")

    document.getElementById("resultstitle").innerHTML = "Extract Less, Use More Coffee"
    document.getElementById("resultsinfo").innerHTML = "<ul><li>Use a coarser grind and/or shorter brew time to extract less</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"

    resultsarea.style.height = "fit-content"

    document.getElementById("appcontainer").style.height = window.innerHeight + "px"

    if (window.innerWidth < 650) {
        resultsarea.style.width = "100%"
        let svgheight = (window.innerHeight - resultsarea.clientHeight - titlearea.clientHeight)
        compass.style.height = svgheight + "px"
        document.getElementById("titlearea").style.position = "relative"

    } else {
        //fullwidth
        let svgheight = window.innerHeight
        document.getElementById("titlearea").style.position = "absolute"
        compass.style.height = svgheight + "px"
        resultsarea.style.width = "50%"
    }

    resultsarea.style.height = resultsarea.clientHeight + "px"
}

function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {

    var radius = innerRadius;
    var spread = outerRadius - innerRadius;
    var innerStart = polarToCartesian(x, y, radius, endAngle);
    var innerEnd = polarToCartesian(x, y, radius, startAngle);
    var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
    var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", outerStart.x, outerStart.y,
        "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
        "L", innerEnd.x, innerEnd.y,
        "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "L", outerStart.x, outerStart.y, "Z"
    ].join(" ");

    return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
