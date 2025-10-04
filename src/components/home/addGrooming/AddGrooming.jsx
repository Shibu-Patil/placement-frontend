  // AddGrooming.jsx
  import React, { useEffect, useState } from "react";
  import { MdBusiness, MdGroups, MdSchool } from "react-icons/md";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import Loader from "../../loading/Loader";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
import { addGroomingThunk } from "../../../slices/AuthSlice";

  const AddGrooming = () => {
    const dispatch = useDispatch();
    const { loading, allTrainers,error } = useSelector(
      (state) => state.authReducer || { loading: false, allTrainers: [] }
    );
    const navigate = useNavigate();


    console.log(allTrainers);

    const TrainerDropdown = ({ allTrainers, selectedTrainers, setSelectedTrainers }) => {
  const [open, setOpen] = useState(false);

  const toggleTrainer = (name) => {
    if (selectedTrainers.includes(name)) {
      setSelectedTrainers(selectedTrainers.filter((t) => t !== name));
    } else {
      setSelectedTrainers([...selectedTrainers, name]);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="border p-2 rounded-2xl cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        {selectedTrainers.length > 0 ? selectedTrainers.join(", ") : "-- Select Trainers --"}
      </div>
      {open && (
        <div className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto z-10">
          {allTrainers.map(trainer => (
            <label key={trainer._id} className="flex items-center gap-2 p-1 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={selectedTrainers.includes(trainer.name)}
                onChange={() => toggleTrainer(trainer.name)}
              />
              {trainer.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

    const [formData, setFormData] = useState({
      companyName: "",
      dateOfRequirement: null,
      dateOfInterview: null,
      skills: "",
      trainerNames: [],   // ✅ now an array
      subject: "",
      subjectTrainerName: "",
      groomingDays: "",
      mode: "",
      totalStudents: "",
      attendedStudents: "",
    });
    const [selectedTrainers, setSelectedTrainers] = useState([]);

    // ✅ Handle inputs
    const handleChange = (e) => {
      const { name, value, multiple, options } = e.target;

      if (multiple) {
        const selectedValues = Array.from(options)
          .filter((opt) => opt.selected)
          .map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, [name]: selectedValues }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  let payload = {
    ...formData,
    trainerNames: selectedTrainers,
    skills: formData.skills.split(",").map((s) => s.trim()),
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

  try {
    // Wait for the dispatch to complete
    const resultAction = await dispatch(addGroomingThunk(payload));

    // Check if the action was fulfilled
    if (addGroomingThunk.fulfilled.match(resultAction)) {
      navigate("/search-grooming"); // ✅ navigate after success
    } else {
      console.log("Failed to add grooming:", resultAction.payload);
    }
  } catch (err) {
    console.error("Error adding grooming:", err);
  }
};
    const inputClass =
      "flex flex-col w-full min-h-[40px] border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200";

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
              <h1 className="text-lg font-bold text-center">
                Add Grooming Session
              </h1>

              {/* Company Name */}
              <div
                className={`${inputClass} ${
                  formData.companyName ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
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
                <label
                  htmlFor="companyName"
                  className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                    formData.companyName
                      ? "top-[-10px] pl-2 text-xs"
                      : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                  }`}
                >
                  Company Name
                </label>
              </div>

              {/* Date of Requirement */}
              <div className={`${inputClass}`}>
                <DatePicker
                  selected={formData.dateOfRequirement}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, dateOfRequirement: date }))
                  }
                  placeholderText="Date of Requirement"
                  className="w-full outline-0 px-2 py-1 rounded-2xl"
                />
              </div>

              {/* Date of Interview */}
              <div className={`${inputClass}`}>
                <DatePicker
                  selected={formData.dateOfInterview}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, dateOfInterview: date }))
                  }
                  placeholderText="Date of Interview"
                  className="w-full outline-0 px-2 py-1 rounded-2xl"
                />
              </div>

              {/* Skills */}
              <div
                className={`${inputClass} ${
                  formData.skills ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
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
                <label
                  className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                    formData.skills
                      ? "top-[-10px] pl-2 text-xs"
                      : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                  }`}
                >
                  Skills
                </label>
              </div>

              {/* Grooming Trainers (Multiple Select) */}
            <TrainerDropdown
              allTrainers={allTrainers}
              selectedTrainers={selectedTrainers}
              setSelectedTrainers={setSelectedTrainers}
            />

              {/* Subject */}
              <div
                className={`${inputClass} ${
                  formData.subject ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
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
                <label
                  className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                    formData.subject
                      ? "top-[-10px] pl-2 text-xs"
                      : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                  }`}
                >
                  Subject
                </label>
              </div>

              {/* Subject Trainer Name (Single Select) */}
              <div
                className={`p-2 ${inputClass} ${
                  formData.subjectTrainerName
                    ? "border-0 border-b-2 rounded-none"
                    : ""
                }`}
              >
                <select
                  name="subjectTrainerName"
                  value={formData.subjectTrainerName}
                  onChange={handleChange}
                  className="w-full outline-0"
                >
                  <option value="">-- Select Subject Trainer --</option>
                  {allTrainers.map((ele) => (
                    <option key={ele._id} value={ele.name} className="capitalize">
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grooming Days */}
              <div
                className={`${inputClass} ${
                  formData.groomingDays ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
                <input
                  type="number"
                  name="groomingDays"
                  value={formData.groomingDays}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="1"
                  id="groomingDays"
                />
                <label
                  htmlFor="groomingDays"
                  className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs ${
                    formData.groomingDays ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
                  Grooming Days
                </label>
              </div>

              {/* Mode */}
              <div
                className={`p-2 ${inputClass} ${
                  formData.mode ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full outline-0"
                >
                  <option value="">-- Select Mode --</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* Total Students */}
              <div
                className={`${inputClass} ${
                  formData.totalStudents ? "border-0 border-b-2 rounded-none" : ""
                }`}
              >
                <input
                  type="number"
                  name="totalStudents"
                  value={formData.totalStudents}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="0"
                  id="totalStudents"
                />
                <label
                  htmlFor="totalStudents"
                  className={`absolute pl-2 top-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${
                    formData.totalStudents ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
                  Total Students
                </label>
              </div>

              {/* Attended Students */}
              <div
                className={`${inputClass} ${
                  formData.attendedStudents
                    ? "border-0 border-b-2 rounded-none"
                    : ""
                }`}
              >
                <input
                  type="number"
                  name="attendedStudents"
                  value={formData.attendedStudents}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="0"
                  id="attendedStudents"
                />
                <label
                  htmlFor="attendedStudents"
                  className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs ${
                    formData.attendedStudents ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
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
    