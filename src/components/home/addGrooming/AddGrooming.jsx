// AddGrooming.jsx
import React, { useEffect, useState } from "react";
import { MdBusiness, MdGroups, MdSchool } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loading/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddGrooming = () => {
  const dispatch = useDispatch();
  const { loading,allTrainers } = useSelector((state) => state.authReducer || { loading: false });
  const navigate = useNavigate();

console.log(allTrainers);

  const [formData, setFormData] = useState({
    companyName: "",
    dateOfRequirement: null,
    dateOfInterview: null,
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

    let payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      trainerNames: formData.trainerNames.split(",").map((t) => t.trim()),
      dateOfRequirement: formData.dateOfRequirement
        ? formData.dateOfRequirement.toISOString().split("T")[0]
        : "",
      dateOfInterview: formData.dateOfInterview
        ? formData.dateOfInterview.toISOString().split("T")[0]
        : "",
      groomingDays: Number(formData.groomingDays),
      totalStudents: Number(formData.totalStudents),
      attendedStudents: Number(formData.attendedStudents),
    };

    console.log("Grooming Data:", payload);

    // dispatch(addGroomingThunk(payload));
    // navigate("/grooming-list");
  };

  const inputClass = "flex flex-col w-full min-h-[40px] border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200";

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

            {/* Company Name */}
            <div className={`${inputClass} ${formData.companyName ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="size-full outline-0"
                  id="companyName"
                />
                <MdBusiness />
              </div>
              <label htmlFor="companyName" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs ${formData.companyName ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Company Name
              </label>
            </div>

            {/* Date of Requirement */}
            <div className={`${inputClass}`}>
              <DatePicker
                selected={formData.dateOfRequirement}
                onChange={(date) => setFormData(prev => ({ ...prev, dateOfRequirement: date }))}
                placeholderText="Date of Requirement"
                className="w-full outline-0 px-2 py-1 rounded-2xl"
              />
            </div>

            {/* Date of Interview */}
            <div className={`${inputClass}`}>
              <DatePicker
                selected={formData.dateOfInterview}
                onChange={(date) => setFormData(prev => ({ ...prev, dateOfInterview: date }))}
                placeholderText="Date of Interview"
                className="w-full outline-0 px-2 py-1 rounded-2xl"
              />
            </div>

            {/* Skills */}
            <div className={`${inputClass} ${formData.skills ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="size-full outline-0"
                />
                <MdSchool />
              </div>
              <label className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs ${formData.skills ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Skills
              </label>
            </div>

            {/* Trainer Names */}
            {/* <div className={`${inputClass} ${formData.trainerNames ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="trainerNames"
                  value={formData.trainerNames}
                  onChange={handleChange}
                  className="size-full outline-0"
          
                />
                <MdGroups />
              </div>
              <label className={`absolute pl-2 top-1.5 transition-all duration-200  [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs ${formData.trainerNames ?  "top-[-10px] pl-2 text-xs" : ""}`}>
                Trainer Names
              </label>
            </div> */}

            <div className={`p-2 ${inputClass} ${formData.trainerNames ? "border-0 border-b-2 rounded-none" : ""}`}>
              <select
                name="trainerNames"
                value={formData?.trainerNames[0]?.toUpperCase()}
                onChange={handleChange}
                className="w-full outline-0 "
              >
                <option value=""  >-- Select Grooming Trainer --</option>
                  {
                    allTrainers.map((ele)=><option key={ele._id} value={ele.name} className="capitalize">{ele.name}</option>)
                  }
              </select>
            </div>

            {/* Subject */}
            <div className={`${inputClass} ${formData.subject ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="size-full outline-0"
                />
                <MdSchool />
              </div>
              <label className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs ${formData.subject ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Subject
              </label>
            </div>

            {/* Subject Trainer Name */}
            {/* <div className={`${inputClass} ${formData.subjectTrainerName ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="subjectTrainerName"
                  value={formData.subjectTrainerName}
                  onChange={handleChange}
                  className="size-full outline-0"
                />
                <MdGroups />
              </div>
              <label className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 [div:focus-within+&]:pl-2 [div:focus-within+&]:text-xs ${formData.subjectTrainerName ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Subject Trainer Name
              </label>
            </div> */}


            <div className={`p-2 ${inputClass} ${formData.subjectTrainerName ? "border-0 border-b-2 rounded-none" : ""}`}>
              <select
                name="subjectTrainerName"
                value={formData.subjectTrainerName[0]?.toUpperCase()}
                onChange={handleChange}
                className="w-full outline-0 "
              >
                <option value=""  >-- Select Subject Trainer --</option>
                  {
                    allTrainers.map((ele)=><option key={ele._id} value={ele.name} className="capitalize">{ele.name}</option>)
                  }
              </select>
            </div>
            {/* Grooming Days */}
            <div className={`${inputClass} ${formData.groomingDays ? "border-0 border-b-2 rounded-none" : ""}`}>
              <input
                type="number"
                name="groomingDays"
                value={formData.groomingDays}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                min="1"
                id="groomingDays"
              />
              <label htmlFor="groomingDays" className={`absolute pl-2 top-1.5 transition-all duration-200  peer-focus:-top-2.5 peer-focus:text-xs  ${formData.groomingDays ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Grooming Days
              </label>
            </div>

            {/* Mode */}
            <div className={`p-2 ${inputClass} ${formData.mode ? "border-0 border-b-2 rounded-none" : ""}`}>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full outline-0 "
              >
                <option value="">-- Select Mode --</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Total Students */}
            <div className={`${inputClass} ${formData.totalStudents ? "border-0 border-b-2 rounded-none" : ""}`}>
              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                min="0"
                id="totalStudents"
              />
              <label htmlFor="totalStudents" className={`absolute pl-2 top-1.5 transition-all  peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${formData.totalStudents ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Total Students
              </label>
            </div>

            {/* Attended Students */}
            <div className={`${inputClass} ${formData.attendedStudents ? "border-0 border-b-2 rounded-none" : ""}`}>
              <input
                type="number"
                name="attendedStudents"
                value={formData.attendedStudents}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                min="0"
                id="attendedStudents"
              />
              <label htmlFor="attendedStudents" className={`absolute pl-2 top-1.5 transition-all duration-200 [div:focus-within+&]:-top-2.5 peer-focus:-top-2.5 peer-focus:text-xs ${formData.attendedStudents ? "top-[-10px] pl-2 text-xs" : ""}`}>
                Attended Students
              </label>
            </div>

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
