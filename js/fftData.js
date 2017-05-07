/**
 * Created by user on 27.04.2017.
 */
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//audioElements
var light = document.getElementById('light');
var light2 = document.getElementById('light2');
var hard = document.getElementById('hard');
var hard2 = document.getElementById('hard2');
var dubstep = document.getElementById('dubstep');
var dubstep2 = document.getElementById('dubstep2');
var jazz = document.getElementById('jazz');


//--------------------------------------------------
//audioSrc
var lightSrc = audioCtx.createMediaElementSource(light);
var lightSrc2 = audioCtx.createMediaElementSource(light2);
var hardSrc = audioCtx.createMediaElementSource(hard);
var hardSrc2 = audioCtx.createMediaElementSource(hard2);
var dubstepSrc = audioCtx.createMediaElementSource(dubstep);
var dubstepSrc2 = audioCtx.createMediaElementSource(dubstep2);
var jazzSrc = audioCtx.createMediaElementSource(jazz);


//---------------------------------------------------------------
//Analysers
var lightAnalyser = audioCtx.createAnalyser();
var lightAnalyser2 = audioCtx.createAnalyser();
var hardAnalyser = audioCtx.createAnalyser();
var hardAnalyser2 = audioCtx.createAnalyser();
var dubstepAnalyser = audioCtx.createAnalyser();
var dubstepAnalyser2 = audioCtx.createAnalyser();
var jazzAnalyser = audioCtx.createAnalyser();


//-------------------------------------------------
// Bind our analyser to the media element source.
lightSrc.connect(lightAnalyser);

lightSrc2.connect(lightAnalyser2);
hardSrc.connect(hardAnalyser);
hardSrc2.connect(hardAnalyser2);
dubstepSrc.connect(dubstepAnalyser);
dubstepSrc.connect(audioCtx.destination);
dubstepSrc2.connect(dubstepAnalyser2);
jazzSrc.connect(jazzAnalyser);


//-------------------------------------------

var start = Date.now();
//frequencyData

var lightFrequency = new Uint8Array(1024);
var lightFrequency2 = new Uint8Array(1024);
var hardFrequency = new Uint8Array(1024);
var hardFrequency2 = new Uint8Array(1024);
var dubstepFrequency = new Uint8Array(1024);
var dubstepFrequency2 = new Uint8Array(1024);
var jazzFrequency = new Uint8Array(1024);

//--------------------------------------------
var progress;
var lightMass = [];
var light2Mass = [];
var hardMass = [];
var hard2Mass = [];
var dubstepMass = [];
var dubstep2Mass = [];
var jazzMass = [];
//---------------------------------
var svgHeight = '300';
var svgWidth = '5000';
var barPadding = '1';

function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}

var svg = createSvg('.audio-dubstep', svgHeight, svgWidth);
var svg1 = createSvg('.audio-hard2', svgHeight, svgWidth);

// Create our initial D3 chart.
svg.selectAll('rect')
    .data(dubstepFrequency)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return i * (svgWidth / dubstepFrequency.length);
    })
    .attr('width', svgWidth / dubstepFrequency.length - barPadding);
//----------------------------------------------------------------
function renderChart() {
    progress = Date.now() - start;

    if(progress < 30000) {
        globalID = requestAnimationFrame(renderChart);

        lightAnalyser.getByteFrequencyData(lightFrequency);
        lightAnalyser2.getByteFrequencyData(lightFrequency2);
        hardAnalyser.getByteFrequencyData(hardFrequency);
        hardAnalyser2.getByteFrequencyData(hardFrequency2);
        dubstepAnalyser.getByteFrequencyData(dubstepFrequency);
        dubstepAnalyser2.getByteFrequencyData(dubstepFrequency2);
        jazzAnalyser.getByteFrequencyData(jazzFrequency);

        //Normalize massive
        for(var i = 0; i < 1024; i++){
            lightMass[i] = lightFrequency[i]/255;
            light2Mass[i] = lightFrequency2[i]/255;
            hardMass[i] = hardFrequency[i]/255;
            hard2Mass[i] = hardFrequency2[i]/255;
            dubstepMass[i] = dubstepFrequency[i]/255;
            dubstep2Mass[i] = dubstepFrequency2[i]/255;
            jazzMass[i] = jazzFrequency[i]/255;
        }
        svg.selectAll('rect')
            .data(dubstepFrequency)
            .attr('y', function(d) {
                return svgHeight - d;
            })
            .attr('height', function(d) {
                return d;
            })
            .attr('fill', function(d) {
                return 'rgb(0, 0, ' + d + ')';
            });

    }else{

        cancelAnimationFrame(globalID);
        console.log(progress + " ");



    }
}

// Run the loop
renderChart();
