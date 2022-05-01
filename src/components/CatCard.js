
const Card = (props) => {
     return (
       <div className="card">
         <img src={props.img} className="card__img" />
         <div className="card__body">
           <h2 className="card__title">{props.title}</h2>
           <p className="card__description">{props.coat}</p>
           <p className="card__description">{props.pattern}</p>
         </div>
       </div>
     );
   }

   export default Card