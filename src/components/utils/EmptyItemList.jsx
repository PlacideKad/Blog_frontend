import emptyBoxImage from '../../img/article/empty-box-svgrepo-com.svg';
const EmptyItemList=({text,style})=>{
  return(
    <div className={style}>
      <span className='[text-transform:upperCase] font-bold'>{text}</span>
      <img src={emptyBoxImage} alt="empty box" className='max-w-100 w-1/2' />
    </div>
  );
}
export default EmptyItemList;