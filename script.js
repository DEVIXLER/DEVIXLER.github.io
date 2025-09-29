const numerica = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'ennea', 'deca', 'hendeca', 'dodeca', 'tridega', 'tetradeca', 'pentadeca', 'hexadeca', 'heptadeca', 'octadeca', 'enneadeca', 'icosa']
const ones = ['', 'henta', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'ennea']
const tens = ['icosi', 'triaconta']
const extended = ['hecta', 'chilia']
const exextended = ['mega', 'giga', 'tera', 'peta', 'exa', 'zetta', 'yotta', 'romma', 'quetta']
const negative = ['anti-', 'nega', 'sub', 'ghosta', 'voida', 'un']

function polygoner(n, recursion) { // made by Scar32
    if (typeof n !== 'string' || n.trim() === '' || isNaN(parseInt(n))) {
        return 'invalidgon';
    }
    if (parseInt(n) == 0) {
      return 'zeragon'
    }
    if (n.length > 33) {
        return 'apeirogon'
    }

    // gon = parseInt(n)
    let isNegative = n.charAt(0) == '-'
    if (isNegative) {
        n = n.slice(1)
    }
    while (n.length < 2) {
        n = '0' + n
    }
    let index = n.length
    let work = parseInt(n.substring(index - 2, index))
    let polyName = []
    if (!recursion) {
        polyName.push('gon')
    }

    if (work > 0) {
        if (work > 0) {
            if (work > 20){
                if (work > 39) {// this bullshit is here just because 20 and 30 is different from the other tens
                    polyName.push(`${ones[parseInt(n[index - 2])]}conta${ones[work % 10]}`)
                } else { // I could just add them into the array but that just seems unessasary because it's only 2
                    polyName.push(`${tens[parseInt(n[index - 2]) - 2]}${ones[work % 10]}`)
                } // a fucking single 'a' in the 3rd tens place, you have got to be kidding me
            } else {
                if (parseInt(n) > 69 && work == 1) { // this is here for that one odd case that comes up every 1/100 times
                    polyName.push('hen')
                } else {
                    polyName.push(numerica[work])
                }
            }
        }
    }
    
    for (let i = 3; i < index + 1 && i < 5; i++) { // for hundreds and thousands
        if (n[index - i] !== '0') {
            if (n[index - i] == "1") {
                polyName.push(extended[i - 3])
            } else {
                polyName.push(`${ones[parseInt(n[index - i])]}${extended[i - 3]}`)
            }
        }
    }
    
    if (index > 4) { // for hundreds of thousands :3
        while (n.length < 6) {
        n = '0' + n
        }
        index = n.length
        work = n.slice(index - 6, index - 4)
        if (parseInt(work) == 1) {
            polyName.push('myria')
        } else if (parseInt(work) > 0) {
            // console.log(work)
            polyName.push(`${polygoner(work, true)}myria`) // this is where shit gets real
        }
    }
    if (index > 6) {
        while (n.length % 3 !== 0) {
        n = '0' + n
        }
        index = n.length
        for (let i = 7; i < index + 1; i += 3) {
            work = n.slice(index - i - 2, index - i + 1)
            if (parseInt(work) == 1) {
                polyName.push(exextended[Math.round(i / 3) - 2])
            } else if (parseInt(work) > 0) {
                polyName.push(`${polygoner(work, true)}${exextended[Math.round(i / 3) - 2]}`)
            }
        }
    }

    work = parseInt(n)
    if (isNegative) {
        polyName.push(negative[Math.abs(work) % 6])
    }
    polyName.reverse()
    polyName = polyName.toString()
    return polyName.replace(/,/g, '');
}

const start = Date.now()
/*
let polyflipper = setInterval(() => { // 9:24
  document.getElementById('polygon').innerHTML = polygoner(`${Math.round(Math.random() * 10 ** Math.round(Date.now() - start) / 1000)}`)
}, 50);

*/