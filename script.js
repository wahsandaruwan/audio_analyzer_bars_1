// Create a new instance for audio object
var audio = new Audio();
audio.src = './sample.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

// Variables for Analyzer
var canvas, ctx, source, context, analyzer, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the mp3 player after page loads
window.addEventListener("load", initMp3, false);
function initMp3(){
    document.getElementById('audio_box').appendChild(audio);
    context = new AudioContext(); // Audiocontext object instance
    analyzer = context.createAnalyser(); //Analyzer node method
    canvas = document.getElementById('analyzer_render');
    ctx = canvas.getContext('2d');
    // Re route the audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyzer);
    analyzer.connect(context.destination);
    frameLooper();
}

// Framelooper() animates any styles of graphics you wish to the audio frequency looping at the
// Default frame rate that the browser provides (approx. 60fps)
function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    // List of Colors
    var cls = ['#c0392b','#e74c3c','#d63031','#EA2027'];
    bars = 100;
    for(var i = 0; i < bars; i++){
        //document.getElementById("overlay").style.background = getRandomColor();

        //Generate a random color from the list
        var random = Math.floor(Math.random() * cls.length);
        ctx.fillStyle = cls[random];
        bar_x = i * 3;
        bar_width = 1.5;
        bar_height = -(fbc_array[i] / 2);
        // fillRect(x, y, width, height) //Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}

// randomColorGen() generates random colors for animated bars
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }