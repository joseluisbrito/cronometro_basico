console.log('script running to...');


/*
Based on Tomasz Nurkiewiczs answer, the "problem" is that typescript is typesafe. :) So the document.getElementById() returns the type HTMLElement which does not contain a value property. The subtype HTMLInputElement does however contain the value property.

So a solution is to cast the result of getElementById() to HTMLInputElement like this:

var inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
<> is the casting operator in typescript. See the question TypeScript: casting HTMLElement.

The resulting javascript from the line above looks like this:

inputValue = (document.getElementById(elementId)).value;
i.e. containing no type information.
*/

let timeToLeft = 0;
let totalTime = 0;

function calcularTiempoSeleccionado() {
    let _minutos = parseInt((<HTMLInputElement>document.getElementById("minutos")).value);
    let _segundos = parseInt((<HTMLInputElement>document.getElementById("segundos")).value);
    timeToLeft = (_minutos * 60 * 1000) + (_segundos * 1000);
    totalTime = parseInt(timeToLeft+'');
}

function countTime() {
setTimeout(() => {
    timeToLeft= timeToLeft - 1000;
    actualizarHTML();
    if(timeToLeft > 0) {
        countTime();
    }
    else {
        timeToLeft = 0;
        totalTime = 0;
        const alertAudio = document.getElementById('audioAlert');
        (alertAudio as HTMLAudioElement).play();
    }
}, 1000);
}



function comenzar() {
    calcularTiempoSeleccionado();
   // console.log('comenzando conteo con: '+timeToLeft);
    if(timeToLeft > 1000 ) {
        countTime();
    }
}

function actualizarHTML() {
    const restante: HTMLElement = document.getElementById('restante') as HTMLElement
    let minutos = Math.floor((timeToLeft/1000) / 60);
    let segundos = (timeToLeft / 1000 ) - minutos * 60;

    restante.innerHTML = `${minutos} minutos, ${segundos} segundos`;

    const progressBar: HTMLElement = document.getElementById('progressBar') as HTMLElement

    progressBar.setAttribute("style", "width: "+calculaProcentajeRestante()+"%;");
    calculaProcentajeRestante();
}

function calculaProcentajeRestante(): number {
    let porcentaje = (timeToLeft/totalTime) * 100;
    return porcentaje
}

