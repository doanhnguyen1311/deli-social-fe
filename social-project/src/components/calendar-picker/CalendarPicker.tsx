// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, getWeek } from "date-fns";
// import { vi } from "date-fns/locale";

// function CalendarPicker() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isOpen, setIsOpen] = useState(false);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setIsOpen(false);
//   };

//   const handleClickFilter = () => {
//     setIsOpen(!isOpen);
//   };

//   const formatWeekDay = (day) => {
//     return ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][day];
//   };

//   // Format date as dd-MM-yyyy
//   const formattedDate = format(selectedDate, "dd-MM-yyyy");
//   const currentWeek = getWeek(selectedDate);

//   return (
//     <div className="calendar-container">
//       <div className="date-display">
//         <span>{formattedDate}</span>
//       </div>

//       <div className="filter-button">
//         <button onClick={handleClickFilter}>
//           Filter by week <span className="arrow-down">▼</span>
//         </button>

//         {isOpen && (
//           <div className="calendar-dropdown">
//             <DatePicker
//               selected={selectedDate}
//               onChange={handleDateChange}
//               inline
//               locale={vi}
//               formatWeekDay={formatWeekDay}
//               showWeekNumbers
//               renderCustomHeader={({
//                 date,
//                 decreaseMonth,
//                 increaseMonth,
//                 prevMonthButtonDisabled,
//                 nextMonthButtonDisabled,
//               }) => (
//                 <div className="custom-header">
//                   <button
//                     onClick={decreaseMonth}
//                     disabled={prevMonthButtonDisabled}
//                   >
//                     {"<"}
//                   </button>
//                   <div className="month-year">
//                     {format(date, "MMMM yyyy", { locale: vi })}
//                   </div>
//                   <button
//                     onClick={increaseMonth}
//                     disabled={nextMonthButtonDisabled}
//                   >
//                     {">"}
//                   </button>
//                 </div>
//               )}
//             />
//           </div>
//         )}
//       </div>

//       <div className="week-info">Tuần hiện tại: {currentWeek}</div>
//     </div>
//   );
// }

// export default CalendarPicker;

import React from "react";

const CalendarPicker = () => {
  return <div>CalendarPicker</div>;
};

export default CalendarPicker;
