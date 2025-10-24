// UpdateGrooming.jsx
import React, { useState } from "react";
import { MdBusiness, MdGroups, MdSchool } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../loading/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateGroomingThunk } from "../../../slices/AuthSlice";

const UpdateGrooming = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, allTrainers } = useSelector((state) => state.authReducer);

  console.log(state);
  
  // Pre-fill formData from state
const [formData, setFormData] = useState({
  dealName: state?.dealName || "",
  companyName: state?.companyName || "",
  dateOfRequirement: state?.dateOfRequirement ? new Date(state.dateOfRequirement) : null,
  dateOfInterview: state?.dateOfInterview ? new Date(state.dateOfInterview) : null,
  skills: state?.skills?.join(", ") || "",
  trainerNames: state?.trainers || [],
  subject: state?.subject || "",
  subjectTrainerName: state?.subjectTrainer.name || "",
  groomingDays: state?.groomingDays || "",
  mode: state?.mode || "",
  totalStudents: state?.totalStudents || "",
  attendedStudents: state?.attendedStudents || "",
  placedStudents: [state?.placedStudents || 0],
  rejectedStudents: [state?.rejectedStudents || 0],
  reasons: state?.reasons[0] || "",
  position: state?.position || "",
  targetGivenByDt: state?.targetGivenByDt || "",
  noOfStudentsSchedule: state?.noOfStudentsSchedule || "",
  scheduleReceiveDateFromDt: state?.scheduleReceiveDateFromDt ? new Date(state.scheduleReceiveDateFromDt) : null,
  addedByHR: state?.addedByHR || "",
  scheduleUpdateInSoftware: state?.scheduleUpdateInSoftware || "",
  status: state?.status || "",
});
// console.log(formData);


const [rounds, setRounds] = useState(state?.interviewRounds?.map(r => r.roundType) || []);

const toggleRound = (round) => {
  if (rounds.includes(round)) {
    setRounds(rounds.filter((r) => r !== round));
  } else {
    setRounds([...rounds, round]);
  }
};

const [selectedTrainers, setSelectedTrainers] = useState(
  state?.trainers?.map((t) => t.name) || []
);

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

  const payload = {
    ...formData,
    trainerNames: selectedTrainers,
    skills: formData.skills.split(",").map((s) => s.trim()),
    dateOfRequirement: formData.dateOfRequirement ? formData.dateOfRequirement.toISOString().split("T")[0] : "",
    dateOfInterview: formData.dateOfInterview ? formData.dateOfInterview.toISOString().split("T")[0] : "",
    scheduleReceiveDateFromDt: formData.scheduleReceiveDateFromDt
      ? formData.scheduleReceiveDateFromDt.toISOString().split("T")[0]
      : "",
    groomingDays: Number(formData.groomingDays),
    totalStudents: Number(formData.totalStudents),
    attendedStudents: Number(formData.attendedStudents),
    placedStudents: [Number(formData.placedStudents)],
    rejectedStudents: [Number(formData.rejectedStudents)],
    position: Number(formData.position),
    targetGivenByDt: Number(formData.targetGivenByDt),
    noOfStudentsSchedule: Number(formData.noOfStudentsSchedule),
    // interviewRounds:rounds,
    id: state?._id,
    interviewRounds: rounds.map((round) => ({
  roundType: round,
  status: "Completed",
  remarks: "",
}))
  };

  console.log(payload);
  

  try {
    const resultAction = await dispatch(updateGroomingThunk(payload));
    if (updateGroomingThunk.fulfilled.match(resultAction)) {
      navigate("/search-grooming");
    } else {
      console.log("Failed to update grooming:", resultAction.payload);
    }
  } catch (err) {
    console.error("Error updating grooming:", err);
  }
  };

  const inputClass =
    "flex flex-col w-full min-h-[40px] border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200";

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
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedTrainers.length > 0
            ? selectedTrainers.join(", ")
            : "-- Select Trainers --"}
        </div>
        {open && (
          <div className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto z-10">
            {allTrainers.map((trainer) => (
              <label
                key={trainer._id}
                className="flex items-center gap-2 p-1 hover:bg-gray-100"
              >
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

  // console.log(selectedTrainers);
  

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
              Update Grooming Session
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

            {/* Trainers */}
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

            {/* Subject Trainer Name */}
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
                <option value={formData.subjectTrainerName}>{formData.subjectTrainerName}</option>
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

            {/* Placed Students */}
            <div
              className={`${inputClass} ${
                formData.placedStudents ? "border-0 border-b-2 rounded-none" : ""
              }`}
            >
              <input
                type="number"
                name="placedStudents"
                value={formData.placedStudents}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                min="0"
                id="placedStudents"
              />
              <label
                htmlFor="placedStudents"
                className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs ${
                  formData.placedStudents ? "top-[-10px] pl-2 text-xs" : ""
                }`}
              >
                Placed Students
              </label>
            </div>

            {/* Rejected Students */}
            <div
              className={`${inputClass} ${
                formData.rejectedStudents ? "border-0 border-b-2 rounded-none" : ""
              }`}
            >
              <input
                type="number"
                name="rejectedStudents"
                value={formData.rejectedStudents}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                min="0"
                id="rejectedStudents"
              />
              <label
                htmlFor="rejectedStudents"
                className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs ${
                  formData.rejectedStudents ? "top-[-10px] pl-2 text-xs" : ""
                }`}
              >
                Rejected Students
              </label>
            </div>

            {/* Reason of Rejection */}
            <div
              className={`${inputClass} ${
                formData.reasons[0] ? "border-0 border-b-2 rounded-none" : ""
              }`}
            >
              <input
                type="text"
                name="reasons"
                value={formData.reasons}
                onChange={handleChange}
                className="size-full outline-0 px-2 peer"
                id="rejectionReason"
              />
              <label
                htmlFor="rejectionReason"
                className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus-within:top-[-10px] peer-focus-within:pl-2  peer-focus-within:text-xs ${
                  formData.reasons[0] ? "top-[-10px] pl-2 text-xs" : ""
                }`}
              >
                Reason of Rejection
              </label>
            </div>


            <div className={`${inputClass} ${formData.dealName ? "border-0 border-b-2 rounded-none" : ""}`}>
  <input
    type="text"
    name="dealName"
    value={formData.dealName}
    onChange={handleChange}
    className="size-full outline-0 px-2"
    placeholder="Deal Name"
  />
</div>

{/* Position & Target */}
<div className="flex gap-2">
  <input type="number" name="position" value={formData.position} onChange={handleChange} className={`${inputClass} pl-2`} placeholder="Position" />
  <input type="number" name="targetGivenByDt" value={formData.targetGivenByDt} onChange={handleChange} className={`${inputClass} pl-2`} placeholder="Target Given By DT" />
</div>

{/* No of Students Schedule & Schedule Receive Date */}
<div className="flex gap-2">
  <input type="number" name="noOfStudentsSchedule" value={formData.noOfStudentsSchedule} onChange={handleChange} className={`${inputClass} pl-2`} placeholder="No of Students Schedule" />
  <DatePicker selected={formData.scheduleReceiveDateFromDt} onChange={(date) => setFormData(prev => ({ ...prev, scheduleReceiveDateFromDt: date }))} placeholderText="Schedule Receive Date" className={inputClass} />
</div>

{/* Added by HR & Schedule Update */}
<div className="flex gap-2">
  <select name="addedByHR" value={formData.addedByHR} onChange={handleChange} className={inputClass}>
    <option value="">-- Select HR --</option>
    <option value="bhumika">Bhumika</option>
    <option value="amrutha">Amrutha</option>
    <option value="supraja">Supraja</option>
  </select>
  <select name="scheduleUpdateInSoftware" value={formData.scheduleUpdateInSoftware} onChange={handleChange} className={inputClass}>
    <option value="">-- Schedule Updated In Software --</option>
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
</div>

{/* Rounds */}
<div className="p-2 w-full border-1 rounded-2xl flex flex-col gap-3">
  <span className="font-bold">Select Round Type</span>
  <div className="flex gap-3 flex-wrap">
    {["Telephonic", "Online Test", "Aptitude", "Technical Written", "Face to Face", "Managerial Round", "HR"].map((round) => (
      <label key={round} className="flex gap-1 items-center cursor-pointer">
        <input type="checkbox" checked={rounds.includes(round)} onChange={() => toggleRound(round)} />
        <span>{round}</span>
      </label>
    ))}
  </div>
</div>

            {/* Submit */}
            <div className="flex w-full min-h-[40px] justify-center">
              <button className="flex w-1/2 h-full bg-main-font rounded-2xl justify-center items-center text-main-front font-bold">
                Update Grooming
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateGrooming;
