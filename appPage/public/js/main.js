    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var stream;
    var audio = document.querySelector('audio');
    var onFail = function(e) {
        console.log('Rejected!', e);
    };

    var onSuccess = function(s) {
        var context = new AudioContext();
        var mediaStreamSource = context.createMediaStreamSource(s);
        recorder = new Recorder(mediaStreamSource);
        recorder.record();
    }
    var isRecording = false;

    function startRecording() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                audio: true
            }, onSuccess, onFail);
        } else {
            console.log('navigator.getUserMedia not present');
        }
    }

    function toggleRecording() {
        isRecording = !isRecording;
        if (isRecording) {
            document.getElementById('recordButton').className = "fa fa-stop";
            startRecording();
        } else {
            document.getElementById('recordButton').className = "fa fa-microphone";
            stopRecording();
        }

    }

    // function upload(blobOrFile) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', '/upload.aspx', true);
    //     xhr.onload = function (e) {
    //         var result = e.target.result;
    //     };
    //
    //     xhr.send(blobOrFile);
    // }

    function stopRecording() {
        recorder.stop();
        recorder.exportWAV(function(s) {
            var url = window.URL.createObjectURL(s);
            audio.src = url
            console.log(audio.src);
            // audio.src = url;
            // audio.controls = true;
            // var hf = document.createElement('a');
            // hf.href = url;
            // hf.download = new Date().toISOString() + '.wav';
            // upload(s);
            window.location.replace("results.html?url=" + url);
        });
        // window.location.replace("results");
        // audio = document.querySelector('audio');
        // recorder.exportWAV(function(s) {
        //     audio.src = window.URL.createObjectURL(s);
        //     console.log(audio.src);
        // });

    }
