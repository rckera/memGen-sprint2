'use strict'

const KEY = 'memeDB'
var gSavedMemes = []

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            font: 'impact',
            txt: 'f',
            size: 40,
            align: 'left',
            color: 'white',
            width: 50,
            height: 50,
        }
    ]
}


function getTypedText(val) {

    if (!gMeme.lines.length) {
        var alignX
        switch (gMeme.lines[gMeme.selectedLineIdx].align) {
            case 'left':
                alignX = 50
                break
            case 'center':
                alignX = gElCanvas.width / 2
                break
            case 'right':
                alignX = gElCanvas.width - 50
                break

        }
        gMeme.lines.push(createLine(alignX, 50))
    }
    gMeme.lines[gMeme.selectedLineIdx].txt = val
    renderCanvas()
}

function addLine() {

    if (!gMeme.lines[gMeme.selectedLineIdx].txt)
        return

    else {
        var newLine
        var alignX
        switch (gMeme.lines[gMeme.selectedLineIdx].align) {
            case 'left':
                alignX = 50
                break
            case 'center':
                alignX = gElCanvas.width / 2
                break
            case 'right':
                alignX = gElCanvas.width - 50
                break

        }
        (gMeme.lines.length >= 2) ? newLine = (createLine(alignX, 250)) : newLine = (createLine(alignX, 450))

        gMeme.lines.push(newLine)
    }
    gMeme.selectedLineIdx++

}

function createLine(x, y) {
    return {
        font: 'impact',
        txt: '',
        size: 40,
        align: gMeme.lines[gMeme.selectedLineIdx].align,
        color: 'white',
        stroke: 'black',
        width: x,
        height: y,
    }
}

function increaseFntSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFntSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function getCurrLine() {
    return gMeme.selectedLineIdx
}


var gDirection = { up: false, down: true }


function switchLine(currLineIdx) {


    if ( currLineIdx === 0) {
        gDirection.up = true
        gDirection.down = false
    }

    if (currLineIdx === gMeme.lines.length - 1) {
        gDirection.down = true
        gDirection.up = false
    }

    if (gDirection.down === true) {
        var newLineIdx = currLineIdx - 1
    }

    if (gDirection.up === true) {
        var newLineIdx = currLineIdx + 1
    }

    return gMeme.selectedLineIdx = newLineIdx
}


function removeLineFromModel() {

    if (!gMeme.lines.length)
        return

    else {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        return (gMeme.selectedLineIdx !== 0) ? gMeme.selectedLineIdx -= 1 : gMeme.selectedLineIdx
    }
}


function onSaveMeme() {
    gSavedMemes.push(gMeme)
    saveToStorage (KEY, gSavedMemes)

}
