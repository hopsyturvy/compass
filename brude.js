var wheel = document.getElementById("wheel")
var compassicon = document.getElementById("compassicon")
var compassrotator = document.getElementById("compassrotator")
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
var compass = document.getElementById("compass")
var pt = compass.createSVGPoint();
var previousturn = 0
var turn = 0
var moved = 0
var searchform = document.getElementById("searchform")
var searchiconwrapper = document.getElementById("searchiconwrapper")
var perfect = document.getElementById("perfect")

const tier = {
    a: {
        outer: 497.36,
        inner: 381.52,
        arcwidth: 2.2
    },
    b: {
        outer: 442.39,
        inner: 281.13,
        arcwidth: 2.7
    },
    c: {
        outer: 268.85,
        inner: 144.90,
        arcwidth: 4
    },
    d: {
        outer: 224.11,
        inner: 113.36,
        arcwidth: 5
    },
    e: {
        outer: 103.8,
        inner: 75.91,
        arcwidth: 45
    }
}





var flavours = {
    Sweet: {
        name: "Sweet",
        flavourangle: 0,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Powdery: {
        name: "Powdery",
        flavourangle: 10,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Pleasing: {
        name: "Pleasing",
        flavourangle: 20,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Empty: {
        name: "Empty",
        flavourangle: 25,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Dusty: {
        name: "Dusty",
        flavourangle: 35,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Aromatic: {
        name: "Aromatic",
        flavourangle: 40,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Astringent: {
        name: "Astringent",
        flavourangle: 45,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Scrawny: {
        name: "Scrawny",
        flavourangle: 61,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Limp: {
        name: "Limp",
        flavourangle: 67,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Dilute: {
        name: "Dilute",
        flavourangle: 74,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Delicate: {
        name: "Delicate",
        flavourangle: 72,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Fragile: {
        name: "Fragile",
        flavourangle: 82,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Muted: {
        name: "Muted",
        flavourangle: 88,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Gentle: {
        name: "Gentle",
        flavourangle: 85,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Thin: {
        name: "Thin",
        flavourangle: 96,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Faint: {
        name: "Faint",
        flavourangle: 98,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Slender: {
        name: "Slender",
        flavourangle: 106,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Sparse: {
        name: "Sparse",
        flavourangle: 112,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Transparent: {
        name: "Transparent",
        flavourangle: 116,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Tealike: {
        name: "Tea-Like",
        flavourangle: 118,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Flimsy: {
        name: "Flimsy",
        flavourangle: 125,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Insipid: {
        name: "Insipid",
        flavourangle: 131,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Soft: {
        name: "Soft",
        flavourangle: 133,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Watery: {
        name: "Watery",
        flavourangle: 137,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Underwhelming: {
        name: "Underwhelming",
        flavourangle: 144,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Bland: {
        name: "Bland",
        flavourangle: 151,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Nutty: {
        name: "Nutty",
        flavourangle: 157,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Vegetal: {
        name: "Vegetal",
        flavourangle: 163,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Nuanced: {
        name: "Nuanced",
        flavourangle: 165,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Sour: {
        name: "Sour",
        flavourangle: 172,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Buttery: {
        name: "Buttery",
        flavourangle: 187,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Salty: {
        name: "Salty",
        flavourangle: 191,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Substantial: {
        name: "Substantial",
        flavourangle: 198,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Quickfinish: {
        name: "Quick Finish",
        flavourangle: 203,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Plump: {
        name: "Plump",
        flavourangle: 210,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Dull: {
        name: "Dull",
        flavourangle: 214,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Sticky: {
        name: "Sticky",
        flavourangle: 222,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Savoury: {
        name: "Savoury",
        flavourangle: 230,
        innerarc: tier.a.inner,
        outerarc: tier.a.outer,
        arcwidth: tier.a.arcwidth
    },
    Big: {
        name: "Big",
        flavourangle: 242,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Bulky: {
        name: "Bulky",
        flavourangle: 244,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Soupy: {
        name: "Soupy",
        flavourangle: 260,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Strong: {
        name: "Strong",
        flavourangle: 258,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Heavy: {
        name: "Heavy",
        flavourangle: 270,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Hefty: {
        name: "Hefty",
        flavourangle: 281,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Harsh: {
        name: "Harsh",
        flavourangle: 279,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Robust: {
        name: "Robust",
        flavourangle: 292,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Overwhelming: {
        name: "Overwhelming",
        flavourangle: 295,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Severe: {
        name: "Severe",
        flavourangle: 310,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Thick: {
        name: "Thick",
        flavourangle: 312,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Intense: {
        name: "Intense",
        flavourangle: 322,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Luscious: {
        name: "Luscious",
        flavourangle: 330,
        innerarc: tier.d.inner,
        outerarc: tier.d.outer,
        arcwidth: tier.d.arcwidth
    },
    Dry: {
        name: "Dry",
        flavourangle: 335,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    },
    Rich: {
        name: "Rich",
        flavourangle: 340,
        innerarc: tier.c.inner,
        outerarc: tier.c.outer,
        arcwidth: tier.c.arcwidth
    },
    Bitter: {
        name: "Bitter",
        flavourangle: 350,
        innerarc: tier.b.inner,
        outerarc: tier.b.outer,
        arcwidth: tier.b.arcwidth
    }

}


//use lower case
var alternateflavours = {
soury: { name: 'soury', nearest: 'Sour'},brothy: { name: 'brothy', nearest: 'Savoury'},green: { name: 'green', nearest: 'Vegetal'},tea: { name: 'tea', nearest: 'Tea-like'},tart: { name: 'tart', nearest: 'Sour'},burned: { name: 'burned', nearest: 'Bitter'},veggie: { name: 'veggie', nearest: 'Vegetal'},ashy: { name: 'ashy', nearest: 'Bitter'},popcorn: { name: 'popcorn', nearest: 'Nutty'},flat: { name: 'flat', nearest: 'Insipid'},beefy: { name: 'beefy', nearest: 'Savoury'},savory: { name: 'savory', nearest: 'Savoury'},medicinal: { name: 'medicinal', nearest: 'Bitter'},peanut: { name: 'peanut', nearest: 'Nutty'},raw: { name: 'raw', nearest: 'Vegetal'},burnt: { name: 'burnt', nearest: 'Bitter'},acidic: { name: 'acidic', nearest: 'Sour'},dishwater: { name: 'dishwater', nearest: 'Watery'},chalky: { name: 'chalky', nearest: 'Powdery'},chalk: { name: 'chalk', nearest: 'Powdery'},papery: { name: 'papery', nearest: 'Dusty'},paper: { name: 'paper', nearest: 'Dusty'},oily: { name: 'oily', nearest: 'Bulky'},cloying: { name: 'cloying', nearest: 'Bulky'},lemon: { name: 'lemon', nearest: 'Sour'},lemony: { name: 'lemony', nearest: 'Sour'},drying: { name: 'drying', nearest: 'Dry'},sandy: { name: 'sandy', nearest: 'Powdery'},boring: { name: 'boring', nearest: 'Dull'},lifeless: { name: 'lifeless', nearest: 'Empty'},grass: { name: 'grass', nearest: 'Vegetal'},grassy: { name: 'grassy', nearest: 'Vegetal'},hay: { name: 'hay', nearest: 'Vegetal'},straw: { name: 'straw', nearest: 'Vegetal'},dirty: { name: 'dirty', nearest: 'Dusty'},earthy: { name: 'earthy', nearest: 'Dusty'},dirt: { name: 'dirt', nearest: 'Dusty'},earth: { name: 'earth', nearest: 'Dusty'},lemons: { name: 'lemons', nearest: 'Sour'},weak: { name: 'weak', nearest: 'Faint'},pungent: { name: 'pungent', nearest: 'Harsh'},bold: { name: 'bold', nearest: 'Robust'},roasty: { name: 'roasty', nearest: 'Bitter'},roasted: { name: 'roasted', nearest: 'Bitter'},carbony: { name: 'carbony', nearest: 'Bitter'},charred: { name: 'charred', nearest: 'Bitter'},pea: { name: 'pea', nearest: 'Vegetal'},peas: { name: 'peas', nearest: 'Vegetal'},cucmber: { name: 'cucmber', nearest: 'Vegetal'},tomato: { name: 'tomato', nearest: 'Soupy'},smoke: { name: 'smoke', nearest: 'Bitter'},smoky: { name: 'smoky', nearest: 'Bitter'},tar: { name: 'tar', nearest: 'Bitter'},tarry: { name: 'tarry', nearest: 'Bitter'},spicy: { name: 'spicy', nearest: 'Intense'},spice: { name: 'spice', nearest: 'Intense'},sharp: { name: 'sharp', nearest: 'Sour'},subtle: { name: 'subtle', nearest: 'Nuanced'},peasy: { name: 'peasy', nearest: 'Vegetal'},beany: { name: 'beany', nearest: 'Vegetal'},beans: { name: 'beans', nearest: 'Vegetal'},bean: { name: 'bean', nearest: 'Vegetal'},

}

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

    for (var name in flavours) {
        addFlavour(flavours[name])

    }



    core.forEach(addCore, this)
    addTicks()

    wheelcontainer.addEventListener('mousedown', onPointerDown)
    wheelcontainer.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
    document.addEventListener('mouseup', onPointerUp)
    document.addEventListener('touchend', (e) => handleTouch(e, onPointerUp))
    document.addEventListener('touchcancel', (e) => handleTouch(e, onPointerUp))
    document.addEventListener('mousemove', onPointerMove)
    wheelcontainer.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
    wheelcontainer.addEventListener('wheel', (e) => scrollWheel(e.deltaY * SCROLL_SENSITIVITY))
    window.addEventListener("resize", resize)

    searchiconwrapper.addEventListener('touchstart', (e) => handleTouch(e, showsearch))
    searchiconwrapper.addEventListener("click", showsearch)

    searchform.addEventListener("submit", search)

    //searchbox.addEventListener('touchstart', (e) => handleTouch(e, hidesearch))
    //searchbox.addEventListener("click", hidesearch)

    //document.getElementById("instructions").addEventListener('touchstart', (e) => handleTouch(e, instructions))
    //document.getElementById("instructions").addEventListener("click", instructions)

    document.getElementById("searchquery").addEventListener("keydown", (evt) => escape(evt))

    window.addEventListener('native.showkeyboard', keyboardShowHandler);
    window.addEventListener('native.hidekeyboard', keyboardHideHandler);


    //check if visited already and kill instructions if so

    //let cookiestr = "visited=yes";
    //let decodedCookie = decodeURIComponent(document.cookie);
    //let ca = decodedCookie.split(';');
    //for (let i = 0; i < ca.length; i++) {
    //    let c = ca[i];
    //    while (c.charAt(0) == ' ') {
    //        c = c.substring(1);
    //    }
    //    if (c.indexOf(cookiestr) == 0) {
    //        moved = 4
    //        instructions()
    //    }
    //}


    resize()
}



function addTicks() {

    for (a = 0; a < 360; a += 11.25) {
        let tick = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let tickpath = "M538,0L517,0";
        tick.setAttribute("d", tickpath)
        tick.setAttribute("class", "tick")
        tick.setAttribute("transform", "rotate(" + a + ")")
        wheel.appendChild(tick)

        checkoverlap(tick)

        for (e = 1; e < 5; e++) {

            let minortick = document.createElementNS("http://www.w3.org/2000/svg", "path");
            let minortickpath = "M535,0L520,0";
            minortick.setAttribute("d", minortickpath)
            minortick.setAttribute("class", "minortick")
            rotation = a + (e * 11.25 / 5)
            minortick.setAttribute("transform", "rotate(" + rotation + ")")



            wheel.appendChild(minortick)

            checkoverlap(minortick)


        }



    }
}

function checkoverlap(el) {

    elrect = el.getBoundingClientRect()

    subcats = document.getElementsByClassName("subcattext")

    for (i = 0; i < subcats.length; i++) {
        subcat = subcats[i].getBoundingClientRect()
        if (((elrect.x > subcat.x && elrect.x < subcat.x + subcat.width) || (elrect.x + elrect.width > subcat.x && elrect.x + elrect.width < subcat.x + subcat.width)) && ((elrect.y > subcat.y && elrect.y < subcat.y + subcat.height) || (elrect.y + elrect.height > subcat.y && elrect.y + elrect.height < subcat.y + subcat.height))) {
            el.remove()
        }

    }


}

function keyboardShowHandler(e) {
    window.removeEventListener("resize", resize)
}
function keyboardHideHandler(e) {
    window.addEventListener("resize", resize)
}


function escape(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        hidesearch();
    }
}

/*function instructions() {
    moved += 1

    

    if (moved == 1) {
        document.getElementById("instructions2").style.animation = "fade-in 1s 1 forwards";
        document.getElementById("instructions1").style.animation = "fade-out 1s 1 forwards";

    } else if (moved == 2) {
        document.getElementById("instructions3").style.animation = "fade-in 1s 1 forwards";
        document.getElementById("instructions2").style.animation = "fade-out 1s 1 forwards";

    } else if (moved == 3) {
        document.getElementById("instructions").style.animation = "fade-out 1s 1 forwards";
        setTimeout(function () { document.getElementById("instructions").style.display = "none"; }, 1000)
    } else if (moved > 3) {
        document.getElementById("instructions").style.display = "none"
    }


    let date = new Date();
    date.setTime(date.getTime() + (60 * 1000)); //currently 1 min: add 90 * 24 * 60 *  to make 90 days

    document.cookie = "visited=yes; expires=" + date + "; path=/"
}*/

function showsearch() {
    searchbox.style = "display: flex"
    document.getElementById("resultswrapper").style = "display: none"
    document.getElementById("searchquery").focus();
    document.getElementById("searchquery").placeholder = ""


}

function hidesearch() {
    searchbox.style = "display: none"
    document.getElementById("resultswrapper").style = "display: block"
    document.getElementById("searchquery").value = ""
    document.getElementById("searchquery").blur();
}

function search() {
    if (currentflavour) { popin(currentflavour) }
    document.getElementById("searchquery").blur();

    var originalquery = document.getElementById("searchquery").value
    var searchquery = document.getElementById("searchquery").value.toLowerCase()
    document.getElementById("searchquery").value = ""

    if (alternateflavours[searchquery]) {
        searchquery = alternateflavours[searchquery].nearest
        document.getElementById("originalquery").innerHTML = originalquery + " > " + searchquery
        document.getElementById("underline").style = "display: block"
    }

    for (var i in flavours) {

        if (searchquery.toLowerCase() == flavours[i].name.toLowerCase()) {

            target = 180 - parseInt(flavours[i].flavourangle)

            turn = target - wheelangle
            if (turn > 180) {
                turn -= 360
            } else if (turn < -180) {
                turn += 360
            }

            currentflavour = flavours[i].name

            turnWheel(turn)

            popout(currentflavour)


            return;
        } else {
            document.getElementById("searchquery").value = ""
            document.getElementById("searchquery").placeholder = originalquery + " not found. Please try a different search term"
            document.getElementById("searchquery").focus();


        }
    }



    //    snapWheel(angle)

}

function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        pt.x = e.touches[0].clientX;
        pt.y = e.touches[0].clientY
        return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY) {
        pt.x = e.clientX;
        pt.y = e.clientY
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
    if (cursorpt.x < 0) { direction = true } else { direction = false }
    previousturn = 0

}

function onPointerUp(e) {

    if (isDragging) {

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

    }


}





function onPointerMove(e) {

    if (isDragging) {

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
}



function alert_coords(evt) {


    getEventLocation(evt)

    // The cursor point, translated into svg coordinates
    cursorpt = pt.matrixTransform(compass.getScreenCTM().inverse());
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
    transformation = "rotate(" + (wheelangle + turnangle) + "deg)"
    if ((wheelangle + turnangle) > 360) {
        wheelangle -= 360
    } else if ((wheelangle + turnangle) < 0) {
        wheelangle += 360
    }

    //wheel.setAttribute("transform", transformation)
    //compassrotator.setAttribute("transform", transformation)
    wheel.style.transform = transformation
    compassrotator.style.transform = transformation

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

    for (var i in flavours) {

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
        popout(currentflavour)
    }

}

function popout(name) {

    perfect.style.stroke = "transparent"

    document.getElementById("bang").style.display = "none"
    document.getElementById("arrow").style.display = "inline"
    hidesearch()

    document.getElementById("indicator").style.visibility = "hidden"
    document.getElementById("popout-container").style.display = "block"

    let popelement = document.getElementById(name + "label")
    let poparc = popelement.previousSibling
    poparc.style.stroke = "#494f4d"

    document.getElementById("popout").innerHTML = name

    showInfo(popelement)

}

function popin(name) {
    document.getElementById("indicator").style.visibility = "hidden"
    document.getElementById("popout-container").style.display = "none"
    document.getElementById("underline").style = "display: none"

    if (name != 'perfect') {

    

    let popelement = document.getElementById(name + "label")
    let poparc = popelement.previousSibling
    poparc.style.stroke = "transparent"
    }

    perfect.style.stroke = "transparent"

    document.getElementById("popout").innerHTML = ""
    document.getElementById("originalquery").innerHTML = ""
    hideInfo()

}

function showInfo(element) {
    document.getElementById("arrow").style = "display: inline"


    if (element.getAttribute("x") < -261) {

        if (wheelangle >= 337.5 || wheelangle < 22.5) {
            resultstitle = "Extract More, Use Less Coffee"
            resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more.</li><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water.</li></ul>"
        } else if (wheelangle >= 22.5 && wheelangle < 67.5) {
            resultstitle = "Extract More"
            resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more.</li></ul>"
        } else if (wheelangle >= 67.5 && wheelangle < 112.5) {
            resultstitle = "Use More Coffee"
            resultsinfo = "<ul><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water.</li></ul>"
        } else if (wheelangle >= 112.5 && wheelangle < 157.5) {
            resultstitle = "Extract Less, Use More Coffee"
            resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less.</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water.</li></ul>"
        } else if (wheelangle >= 157.5 && wheelangle < 202.5) {
            resultstitle = "Extract Less, Use More Coffee"
            resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less.</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water.</li></ul>"
        } else if (wheelangle >= 202.5 && wheelangle < 247.5) {
            resultstitle = "Extract Less"
            resultsinfo = "<ul><li>Use a coarser grind and/or shorter brew time to extract less.</li></ul>"
        } else if (wheelangle >= 247.5 && wheelangle < 292.5) {
            resultstitle = "Use Less Coffee"
            resultsinfo = "<ul><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water.</li></ul>"
        } else if (wheelangle >= 292.5 && wheelangle < 337.5) {
            resultstitle = "Extract More, Use Less Coffee"
            resultsinfo = "<ul><li>Use a finer grind and/or longer brew time to extract more.</li><li>Increase the Brew Ratio by fixing the water weight and using less coffee OR by fixing the dose and using more water.</li></ul>"
        }

    } else {
        resultstitle = "Green Zone"
        if (wheelangle >= 337.5 || wheelangle < 22.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time and use less coffee.</li></ul>"
        } else if (wheelangle >= 22.5 && wheelangle < 67.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time.</li></ul>"
        } else if (wheelangle >= 67.5 && wheelangle < 112.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you decrease the Brew Ratio by using more coffee.</li></ul>"
        } else if (wheelangle >= 112.5 && wheelangle < 157.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time and use more coffee.</li></ul>"
        } else if (wheelangle >= 157.5 && wheelangle < 202.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time and use more coffee.</li></ul>"
        } else if (wheelangle >= 202.5 && wheelangle < 247.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a coarser grind / shorter brew time.</li></ul>"
        } else if (wheelangle >= 247.5 && wheelangle < 292.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you increase the Brew Ratio by using less coffee.</li></ul>"
        } else if (wheelangle >= 292.5 && wheelangle < 337.5) {
            resultsinfo = "<ul><li>Your brew is good, but you might find an even more balanced flavour if you use a finer grind / longer brew time and use less coffee.</li></ul>"
        }
    }

    document.getElementById("resultstitle").innerHTML = resultstitle
    document.getElementById("resultsinfo").innerHTML = resultsinfo

    results = document.getElementById("resultsarea")
    results.style.opacity = "1"



}

function hideInfo() {
    document.getElementById("resultstitle").innerHTML = ""
    document.getElementById("resultsinfo").innerHTML = ""
    document.getElementById("arrow").style = "display: none"

}


function turnWheel(a) {

    wheelangle += a

    transformation = "rotate(" + wheelangle + "deg)"

    wheel.classList.add("turning")


    //wheel.setAttribute("transform", transformation)
    //compassrotator.setAttribute("transform", transformation)
    wheel.style.transform = transformation
    compassrotator.style.transform = transformation

    if (wheelangle > 360) {
        wheelangle -= 360
    } else if (wheelangle < 0) {
        wheelangle += 360
    }

    setTimeout(function () {
        wheel.classList.remove("turning")

        //instantly resets rotation if over 360
        transformation = "rotate(" + wheelangle + "deg)"
        //wheel.setAttribute("transform", transformation)
        //compassrotator.setAttribute("transform", transformation)
        wheel.style.transform = transformation
        compassrotator.style.transform = transformation

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
    let arcpath = describeArc(0, 0, -tier.e.inner, -tier.e.outer, -properties.arcwidth, properties.arcwidth, false);
    arc.setAttribute("d", arcpath)
    arc.setAttribute("fill", "hsl(158,13%,63%)")

    arc.setAttribute("transform", transformation)
    //wheel.insertBefore(arc, wheel.firstChild)
    core.appendChild(label)
}

function addFlavour(properties) {


    let newflavour = document.createElementNS("http://www.w3.org/2000/svg", "g");
    newflavour.setAttribute("id", properties.name)

    let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let transformation = "rotate(" + (180 + properties.flavourangle) + ")"

    let labelplace = - (properties.outerarc) + 10;

    label.setAttribute("x", labelplace)
    label.setAttribute("y", 0)
    label.setAttribute("id", properties.name + "label")
    label.setAttribute("class", "label")
    label.setAttribute("text-anchor", "left")
    label.setAttribute("data-angle", properties.flavourangle)
    label.setAttribute("data-outer-arc", properties.outerarc)
    label.setAttribute("data-name", properties.name)
    label.setAttribute("alignment-baseline", "central")
    label.innerHTML = properties.name

    let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let arcpath = describeArc(0, 0, -properties.innerarc, -properties.outerarc, -properties.arcwidth, properties.arcwidth, true);
    arc.setAttribute("d", arcpath)
    arc.setAttribute("class", "arc")
    arc.setAttribute("fill", colourPicker(properties.flavourangle, properties.outerarc))

    newflavour.appendChild(arc)
    newflavour.appendChild(label)

    newflavour.setAttribute("transform", transformation)


    wheel.appendChild(newflavour)
    //newflavour.addEventListener('click', (e) => click(e))
}

function click(e) {



    if (currentflavour) { popin(currentflavour) }

    if (e.target.getAttribute("id")=="perfect") {

            document.getElementById("resultstitle").innerHTML = "Green Zone"
            document.getElementById("resultsinfo").innerHTML = "A good brew is balanced, creamy, fruity, mouth-filling and tasty. Good job!"
            perfect.style.stroke = "#494f4d";
            currentflavour = "perfect";
            console.log(currentflavour)
        
            results = document.getElementById("resultsarea")
            results.style.opacity = "1"
        
    } else {



    let target = 180 - parseInt(e.target.getAttribute("data-angle"))
    currentflavour = e.target.getAttribute("data-name")

    if (!target) {
        if (!e.target.nextSibling.length) {
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

}

function resize() {

    let titlearea = document.getElementById("titlearea")
    let resultsarea = document.getElementById("resultsarea")

    //    let OGtitle = document.getElementById("resultstitle").innerHTML
    //    let OGcontent = document.getElementById("resultsinfo").innerHTML

    //    document.getElementById("resultstitle").innerHTML = "Extract Less, Use More Coffee"
    //    document.getElementById("resultsinfo").innerHTML = "<ul><li>Use a coarser grind and/or shorter brew time to extract less</li><li>Decrease the Brew Ratio by fixing the water weight and using more coffee OR by fixing the dose and using less water</li></ul>"

    //    resultsarea.style.height = "fit-content"

    document.getElementById("appcontainer").style.height = document.documentElement.clientHeight + "px"

    if (document.documentElement.clientWidth < 450 || document.documentElement.clientHeight < 450) {
        //small screen 
        compass.setAttribute("viewBox", "-600 -600 700 800")
        let svgheight = (document.documentElement.clientHeight) // - resultsarea.clientHeight - titlearea.clientHeight)
        compass.style.height = svgheight + "px"


        //} else if (document.documentElement.clientWidth < 600 && document.documentElement.clientWidth / document.documentElement.clientHeight > 5/3) {
        //    //small landscape screen
        //    let svgheight = (document.documentElement.clientHeight - resultsarea.clientHeight - titlearea.clientHeight)
        //    compass.style.height = svgheight + "px"

    } else {
        //fullwidth
        compass.setAttribute("viewBox", "-600 -600 700 1100")
        let svgheight = document.documentElement.clientHeight
        compass.style.height = svgheight + "px"


    }



    //    resultsarea.style.height = resultsarea.clientHeight + "px"

    //    document.getElementById("resultstitle").innerHTML = OGtitle
    //    document.getElementById("resultsinfo").innerHTML = OGcontent
}

function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle, corners) {

    var radius = innerRadius;
    var spread = outerRadius - innerRadius;
    var innerStart = polarToCartesian(x, y, radius, endAngle);
    var innerEnd = polarToCartesian(x, y, radius, startAngle);
    var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
    var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    //    (0, 0, -tier.e.inner, -tier.e.outer, -properties.arcwidth, properties.arcwidth);

    if (corners) {
        var d = [
            "M", outerStart.x + 2, outerStart.y,
            "a2,2 1 0 0 -2,2A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y - 2,
            "a2,2 1 0 0 2,2L", innerEnd.x - 2, innerEnd.y,
            "a2,2 1 0 0 2,-2A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y + 2,
            "a2,2 1 0 0 -2,-2L", outerStart.x + 2, outerStart.y, "Z"
        ].join(" ");
    } else {
        var d = [
            "M", outerStart.x, outerStart.y,
            "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
            "L", innerEnd.x, innerEnd.y,
            "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
            "L", outerStart.x, outerStart.y, "Z"
        ].join(" ");
    }


    return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function colourPicker(angle, distance) {

    let hue, saturation, lightness;


    if (distance > tier.c.outer) {

        // outer ring

        //hue
        hue = 340
        if (angle < 180) {
            hue -= (90 - Math.abs(90 - angle)) / (90 / 30) // last number is max distance from default hue

        } else {
            hue += (90 - Math.abs(270 - angle)) / (90 / 8) // last number is max distance from default hue
        }

        //saturation
        saturation = 41
        if (angle < 135) {
            //distance from -45, min saturation (11) at 135
            saturation -= (angle + 45) / (180 / 30) // last number is max distance from default
        } else {
            //distance from 315, min saturation at 135
            saturation -= Math.abs(315 - angle) / (180 / 30)
        }

        //lightness
        lightness = 58
        if (angle < 135) {
            //distance from -45, min saturation (11) at 135
            lightness += (angle + 45) / (180 / 25) // last number is max distance from default
        } else {
            //distance from 315, min saturation at 135
            lightness += Math.abs(315 - angle) / (180 / 25)
        }


    } else {

        // inner ring

        hue = 158
        saturation = 10
        // 10-17
        if (angle < 135) {
            //distance from -45, min at 135
            saturation += (angle + 45) / (180 / 7) // last number is max distance from default
        } else {
            //distance from 315, min 135
            saturation += Math.abs(315 - angle) / (180 / 7)
        }
        lightness = 58
        //58 - 69
        if (angle < 135) {
            //distance from -45, min at 135
            lightness += (angle + 45) / (180 / 11) // last number is max distance from default
        } else {
            //distance from 315, min at 135
            lightness += Math.abs(315 - angle) / (180 / 11)
        }



    }

    return "hsl(" + hue + "," + saturation + "%," + lightness + "%)"


}