export const getCloudinaryLink=(publicId,imageSettings)=>{
  return `https://res.cloudinary.com/dmipesfyo/image/upload${imageSettings?`/${imageSettings.fill},${imageSettings.height},${imageSettings.width}/`:'/'}${publicId}`
}
export const getDisplayNameFromCloudinaryLink=(link)=>{
  return link.split('/')[link.split('/').length-1];
}