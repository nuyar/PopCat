var sp;
var op;
var cl;

function load() {
	sp = document.querySelector('span');
	op = document.querySelector('#open');
	cl = document.querySelector('#close');
	
	op.style.display = 'none';
	cl.style.display = '';
}

function play() {
	var context = new AudioContext();

	analyserNode = context.createAnalyser();

	analyserNode.fftSize = 32;
	
	fftData = new Float32Array(this.analyserNode.frequencyBinCount);
	
	navigator.getUserMedia (
		{
			audio: true,
			video: false
		},
		function (stream) {
			audioSource = context.createMediaStreamSource(stream);
			
			audioSource.connect(this.analyserNode);
			
			setInterval(() => {
				analyserNode.getFloatFrequencyData(this.fftData);analyserNode.getFloatFrequencyData(fftData);
				sp.textContent = max(fftData)
				
				if(sp.textContent < -60.0) {
					op.style.display = 'none';
					cl.style.display = '';
				} else {
					cl.style.display = 'none';
					op.style.display = '';
				}
			},10);
		},
		function (err) {
			alert('Failed to initializing microphone: ' + err);
		}
	);

	max = (ii) => {
		var m = -9999.0;
		for(var i=0; i<ii.length; i++)
			m = Math.max(m,ii[0]);
		return m;
	};
}
