
const spawn = require('child_process').spawn;

let FilePath = 'https://drive.google.com/file/d/19235ogENZ3cAFPsT0BfwcqD3xXvt-h2M/view';  // Your Video File you want To loop through.

let streamKey = 'rcmk-ww63-ve82-5v4r-5ehx';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${ streamKey }`]);
ffmpeg.on('exit', (statusCode) => {
  if (statusCode === 0) {
     console.log('Stream Completed')
  }
})

ffmpeg
  .stderr
  .on('data', (task) => {
    console.log('Task:', new String(task))
  })
