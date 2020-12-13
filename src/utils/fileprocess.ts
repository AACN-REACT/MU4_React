// video mime types
// Flash	.flv	video/x-flv
// MPEG-4	.mp4	video/mp4
// iPhone Index	.m3u8	application/x-mpegURL
// iPhone Segment	.ts	video/MP2T
// 3GP Mobile	.3gp	video/3gpp
// QuickTime	.mov	video/quicktime
// A/V Interleave	.avi	video/x-msvideo
// Windows Media	.wmv	video/x-ms-wmv

let acceptedFormats = [
  "video/mp4",
  "video/webm",
  "video/webm; codecs=vp9",
  "video/ogg",
  "video/x-flv",
  "video/quicktime",
  "video/x-matroska;codecs=avc1,opus",
  "application/x-mpegURL",
  "video/MP2T",
  "video/3gpp",
  "video/x-msvideo",
  "video/x-ms-wmv",
];
export function isAcceptableType(file) {

    if(acceptedFormats.includes(file['type'])) return true ;

    return false
}

export function isWithinSizeLimit(file, limit=50000000){
  if(file['size']<limit){
    return true
  }
  return false
}
