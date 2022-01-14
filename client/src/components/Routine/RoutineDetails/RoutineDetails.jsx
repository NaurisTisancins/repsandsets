// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles.scss';

// export const RoutineDetails = ({ routine }) => {
//   return (
//     <div className="detailContainer">
//       <div className="routineMovements">
//         <h3>Movements: </h3>
//         <ul className="movementList">
//           {routine.movements.map(({ name, _id }) => {
//             return (
//               <div className="itemRow" key={_id}>
//                 <li
//                   className="movementListItem"
//                   >{name}</li>
//                 <button className="statBtn">Statistics</button>
//               </div>
//             )
//           })}
//         </ul>
//         <div className="itemRow">
//           <Link
//           to={`/routines/update/${routine._id}`}
//           ><button className="addMovementBtn">Add Movement</button></Link>
//         </div>
//       </div>
//     </div>
//   )
// }


