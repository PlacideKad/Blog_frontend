  export const getFileColor=(format,display_name)=>{
    const extension=format?format:display_name.split('.').pop();
    switch(extension.toLowerCase()){
      case 'pdf':
        return {extension:'PDF',color:'bg-red-700'};
      case 'txt':
        return {extension:'TXT',color:'bg-gray-600'};
      case 'docx':
        return {extension:'DOCX',color:'bg-blue-700'};
      case 'xlsx':
        return {extension:'XLSX',color:'bg-green-700'};
      default:
        return {extension:'FILE',color:'bg-neutral-600'};
    }
  };