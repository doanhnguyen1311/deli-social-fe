// import { forwardRef, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Input } from "@/components/input"; // gọi thẳng Input cũ
// import { KTIcon } from "@/_metronic/helpers";

// interface CustomDateInputProps {
//   value?: Date | null;
//   onChange?: (date: Date | null) => void;
//   insertLeft?: React.ReactNode;
//   insertRight?: React.ReactNode;
//   placeholder?: string;
//   className?: string;
// }

// const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
//   ({ value, onChange, insertLeft, insertRight, placeholder, className }, ref) => {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

//     const handleChange = (date: Date | null) => {
//       setSelectedDate(date);
//       onChange?.(date);
//     };

//     return (
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleChange}
//         dateFormat="d MMMM, yyyy"
//         customInput={
//           <Input
//             ref={ref}
//             type="text"
//             value={selectedDate ? selectedDate.toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric' }) : ""}
//             readOnly
//             insertLeft={insertLeft}
//             insertRight={insertRight}
//             placeholder={placeholder}
//             className={className}
//           />
//         }
//       />
//     );
//   }
// );

// export default CustomDateInput;
