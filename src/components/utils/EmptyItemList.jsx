import { getCloudinaryLink } from "./cloudinaryLink";

const EmptyItemList=({text,style})=>{
  return(
    <div className={style}>
      <span className='[text-transform:upperCase] font-bold'>{text}</span>
      <img src={getCloudinaryLink("empty-box-svgrepo-com_bnvxbm")} alt="empty box" className='max-w-100 w-1/2' />
    </div>
  );
}
export default EmptyItemList;