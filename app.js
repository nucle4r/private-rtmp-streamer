
const spawn = require('child_process').spawn;

let FilePath = 'http://dl22.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ0lrY00vakQ0c0lxUkJ0c1pxZ01mckY4eGNPcEVHeVkrdFdwc0Qxblh0WC95aUF6dXNrcWNlVldMWjN0a2JvRy84NExGeENaRWhSbGoxaTdMbGtEaDZqRGpsZjh6RlNQMEVTMjUwdGxSMjBTUFdudGZacVVHOTRWdjY0aCtsZFhZSHN5OE9jL2JmL05RRm5tWENlZkxiM1o4R29pdVAzWTVNeWVTTHZRWHp6STBydHRCOFRWQnhkNjlsem91dDl2L3F2QmNxazZaTmloWDB1YXlyRnNwekdiMk9jQ1YxS2lzRTdMSytDVUpJbG5CTHJEam5zTHd6czNNZklQST0%3D';  // Your Video File you want To loop through.

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
