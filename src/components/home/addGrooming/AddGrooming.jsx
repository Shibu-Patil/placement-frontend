// AddGrooming.jsx
import React, { useState } from "react";
import { MdBusiness, MdOutlineDateRange, MdGroups, MdSchool } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loading/Loader";

const AddGrooming = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.groomingReducer || { loading: false });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    dateOfRequirement: "",
    dateOfInterview: "",
    skills: "",
    trainerNames: "",
    subject: "",
    subjectTrainerName: "",
    groomingDays: "",
    mode: "",
    totalStudents: "",
    attendedStudents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      trainerNames: formData.trainerNames.split(",").map((t) => t.trim()),
      groomingDays: Number(formData.groomingDays),
      totalStudents: Number(formData.totalStudents),
      attendedStudents: Number(formData.attendedStudents),
    };

    console.log("Grooming Data:", payload);

    // dispatch(addGroomingThunk(payload))
    // navigate("/grooming-list")
  };

  const inputWrapper = (fieldName, icon, placeholder = "", type = "text") => (
    <div
      className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl
        focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200
        ${formData[fieldName] ? "border-0 border-b-2 rounded-none" : ""}`}
    >
      <div className="flex size-full absolute justify-center items-center px-2">
        <input
          type={type}
          id={fieldName}
          name={fieldName}
          value={formData[fieldName]}
          onChange={handleChange}
          className="size-full outline-0"
          placeholder={placeholder}
          min={type === "number" ? "0" : undefined}
        />
        {icon}
      </div>
      <label
        htmlFor={fieldName}
        className={`absolute pl-2 top-1.5 transition-all duration-200
          ${formData[fieldName] ? "top-[-10px] pl-2 text-xs" : ""}`}
      >
        {placeholder || fieldName}
      </label>
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="size-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="size-full flex justify-center items-center bg-white">
          <form
            className="h-5/6 w-1/2 rounded-4xl animate-bgblur bg-white/40 shadow-[0px_6px_30px_3px_#111] overflow-scroll p-10 flex flex-col gap-6 max-md:w-4/5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-lg font-bold text-center">Add Grooming Session</h1>

            {inputWrapper("companyName", <MdBusiness />, "Company Name")}
            {inputWrapper("dateOfRequirement", <MdOutlineDateRange />, "Date of Requirement", "date")}
            {inputWrapper("dateOfInterview", <MdOutlineDateRange />, "Date of Interview", "date")}
            {inputWrapper("skills", <MdSchool />, "Skills")}
            {inputWrapper("trainerNames", <MdGroups />, "Trainer Names")}
            {inputWrapper("subject", <MdSchool />, "Subject")}
            {inputWrapper("subjectTrainerName", <MdGroups />, "Subject Trainer Name")}
            {inputWrapper("groomingDays", null, "Grooming Days", "number")}
            
            <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl
              focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200
              ${formData.mode ? "border-0 border-b-2 rounded-none" : ""}`}>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full outline-0 px-2"
              >
                <option value="">-- Select Mode --</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {inputWrapper("totalStudents", null, "Total Students", "number")}
            {inputWrapper("attendedStudents", null, "Attended Students", "number")}

            {/* Submit */}
            <div className="flex w-full min-h-[40px] justify-center">
              <button className="flex w-1/2 h-full bg-main-font rounded-2xl justify-center items-center text-main-front font-bold">
                Add Grooming
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddGrooming;





// // // AddGrooming.jsx
// import React, { useState } from "react";
// import { MdBusiness, MdGroups, MdSchool } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../loading/Loader";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const AddGrooming = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.groomingReducer || { loading: false });
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     companyName: "",
//     dateOfRequirement: null,
//     dateOfInterview: null,
//     skills: "",
//     trainerNames: "",
//     subject: "",
//     subjectTrainerName: "",
//     groomingDays: "",
//     mode: "",
//     totalStudents: "",
//     attendedStudents: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let payload = {
//       ...formData,
//       skills: formData.skills.split(",").map((s) => s.trim()),
//       trainerNames: formData.trainerNames.split(",").map((t) => t.trim()),
//       dateOfRequirement: formData.dateOfRequirement ? formData.dateOfRequirement.toISOString().split("T")[0] : "",
//       dateOfInterview: formData.dateOfInterview ? formData.dateOfInterview.toISOString().split("T")[0] : "",
//       groomingDays: Number(formData.groomingDays),
//       totalStudents: Number(formData.totalStudents),
//       attendedStudents: Number(formData.attendedStudents),
//     };

//     console.log("Grooming Data:", payload);

//     // dispatch(addGroomingThunk(payload));
//     // navigate("/grooming-list");
//   };

//   return (
//     <>
//       {loading ? (
//         <div className="size-full flex justify-center items-center">
//           <Loader />
//         </div>
//       ) : (
//         <div className="size-full flex justify-center items-center bg-white">
//           <form
//             className="h-5/6 w-1/2 rounded-4xl animate-bgblur bg-white/40 shadow-[0px_6px_30px_3px_#111] overflow-scroll p-10 flex flex-col gap-6 max-md:w-4/5"
//             onSubmit={handleSubmit}
//           >
//             <h1 className="text-lg font-bold text-center">Add Grooming Session</h1>

//             {/* Company Name */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200 ${formData.companyName ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <div className="flex size-full absolute justify-center items-center px-2">
//                 <input
//                   type="text"
//                   id="companyName"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   className="size-full outline-0"
//                 />
//                 <MdBusiness />
//               </div>
//               <label htmlFor="companyName" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.companyName ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Company Name
//               </label>
//             </div>

//             {/* Date of Requirement */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200`}>
//               <DatePicker
//                 selected={formData.dateOfRequirement}
//                 onChange={(date) => setFormData(prev => ({ ...prev, dateOfRequirement: date }))}
//                 placeholderText="Select Date of Requirement"
//                 className="w-full outline-0 px-2 py-1 rounded-2xl"
//               />
//             </div>

//             {/* Date of Interview */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200`}>
//               <DatePicker
//                 selected={formData.dateOfInterview}
//                 onChange={(date) => setFormData(prev => ({ ...prev, dateOfInterview: date }))}
//                 placeholderText="Select Date of Interview"
//                 className="w-full outline-0 px-2 py-1 rounded-2xl"
//               />
//             </div>

//             {/* Skills */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.skills ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <div className="flex size-full absolute justify-center items-center px-2">
//                 <input
//                   type="text"
//                   id="skills"
//                   name="skills"
//                   value={formData.skills}
//                   onChange={handleChange}
//                   className="size-full outline-0"
//                   placeholder="Comma separated (e.g. Java, Spring)"
//                 />
//                 <MdSchool />
//               </div>
//               <label htmlFor="skills" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.skills ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Skills
//               </label>
//             </div>

//             {/* Trainer Names */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.trainerNames ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <div className="flex size-full absolute justify-center items-center px-2">
//                 <input
//                   type="text"
//                   id="trainerNames"
//                   name="trainerNames"
//                   value={formData.trainerNames}
//                   onChange={handleChange}
//                   className="size-full outline-0"
//                   placeholder="Comma separated"
//                 />
//                 <MdGroups />
//               </div>
//               <label htmlFor="trainerNames" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.trainerNames ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Trainer Names
//               </label>
//             </div>

//             {/* Subject */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.subject ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <div className="flex size-full absolute justify-center items-center px-2">
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="size-full outline-0"
//                 />
//                 <MdSchool />
//               </div>
//               <label htmlFor="subject" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.subject ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Subject
//               </label>
//             </div>

//             {/* Subject Trainer Name */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.subjectTrainerName ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <div className="flex size-full absolute justify-center items-center px-2">
//                 <input
//                   type="text"
//                   id="subjectTrainerName"
//                   name="subjectTrainerName"
//                   value={formData.subjectTrainerName}
//                   onChange={handleChange}
//                   className="size-full outline-0"
//                 />
//                 <MdGroups />
//               </div>
//               <label htmlFor="subjectTrainerName" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.subjectTrainerName ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Subject Trainer Name
//               </label>
//             </div>

//             {/* Grooming Days */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.groomingDays ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <input
//                 type="number"
//                 id="groomingDays"
//                 name="groomingDays"
//                 value={formData.groomingDays}
//                 onChange={handleChange}
//                 className="size-full outline-0 px-2"
//                 min="1"
//               />
//               <label htmlFor="groomingDays" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.groomingDays ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Grooming Days
//               </label>
//             </div>

//             {/* Mode */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.mode ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <select
//                 name="mode"
//                 value={formData.mode}
//                 onChange={handleChange}
//                 className="w-full outline-0 px-2"
//               >
//                 <option value="">-- Select Mode --</option>
//                 <option value="Online">Online</option>
//                 <option value="Offline">Offline</option>
//               </select>
//             </div>

//             {/* Total Students */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.totalStudents ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <input
//                 type="number"
//                 id="totalStudents"
//                 name="totalStudents"
//                 value={formData.totalStudents}
//                 onChange={handleChange}
//                 className="size-full outline-0 px-2"
//                 min="0"
//               />
//               <label htmlFor="totalStudents" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.totalStudents ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Total Students
//               </label>
//             </div>

//             {/* Attended Students */}
//             <div className={`flex flex-col w-full min-h-[40px] border relative rounded-2xl transition-all duration-200 ${formData.attendedStudents ? "border-0 border-b-2 rounded-none" : ""}`}>
//               <input
//                 type="number"
//                 id="attendedStudents"
//                 name="attendedStudents"
//                 value={formData.attendedStudents}
//                 onChange={handleChange}
//                 className="size-full outline-0 px-2"
//                 min="0"
//               />
//               <label htmlFor="attendedStudents" className={`absolute pl-2 top-1.5 transition-all duration-200 ${formData.attendedStudents ? "top-[-10px] pl-2 text-xs" : ""}`}>
//                 Attended Students
//               </label>
//             </div>

//             {/* Submit */}
//             <div className="flex w-full min-h-[40px] justify-center">
//               <button className="flex w-1/2 h-full bg-main-font rounded-2xl justify-center items-center text-main-front font-bold">
//                 Add Grooming
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddGrooming;
 