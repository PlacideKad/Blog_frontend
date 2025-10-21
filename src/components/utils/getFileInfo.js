  export const getFileInfos=(filename)=>{
    const extensions=['pdf','txt','docx','xlsx']
    if(extensions.includes(filename.split('.')[1])){
      if(/.(.pdf)$/.test(filename)) return{extension:'PDF',color:'bg-red-700'}
      if(/.(.txt)$/.test(filename)) return{extension:'TXT',color:'bg-gray-600'}
      if(/.(.docx)$/.test(filename)) return{extension:'DOCX',color:'bg-blue-700'}
      if(/.(.xlsx)$/.test(filename)) return{extension:'XLSX',color:'bg-green-700'}
    }else return{extension:'File',color:'bg-neutral-600'}
  };
