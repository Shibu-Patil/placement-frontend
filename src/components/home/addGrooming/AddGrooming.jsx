// AddGrooming.jsx (Fixed version, styling untouched)
import React, { useState } from "react";
import { MdBusiness, MdSchool, MdDriveFileRenameOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loading/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addGroomingThunk } from "../../../slices/AuthSlice";

const AddGrooming = () => {
  const dispatch = useDispatch();
  const { loading, allTrainers } = useSelector((state) => state.authReducer || { loading: false, allTrainers: [] });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dealName: "",
    companyName: "",
    dateOfRequirement: null,
    dateOfInterview: null,
    skills: "",
    trainerNames: [],
    subject: "",
    subjectTrainerName: "",
    groomingDays: "",
    mode: "",
    totalStudents: "",
    attendedStudents: "",
    position: "",
    targetGivenByDt: "",
    noOfStudentsSchedule: "",
    scheduleReceiveDateFromDt: null,
    addedByHR: "",
    scheduleUpdateInSoftware: "",
    status: "",
    interviewRounds:[],
  });

  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [rounds, setRounds] = useState([]);

  // Toggle interview rounds
  const toggleRound = (round) => {
    if (rounds.includes(round)) setRounds(rounds.filter((r) => r !== round));
    else setRounds([...rounds, round]);
  };

  // Handle regular inputs
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
  dateOfRequirement: formData.dateOfRequirement
    ? formData.dateOfRequirement.toISOString().split("T")[0]
    : "",
  dateOfInterview: formData.dateOfInterview
    ? formData.dateOfInterview.toISOString().split("T")[0]
    : "",
  scheduleReceiveDateFromDt: formData.scheduleReceiveDateFromDt
    ? formData.scheduleReceiveDateFromDt.toISOString().split("T")[0]
    : "",
  groomingDays: Number(formData.groomingDays),
  totalStudents: Number(formData.totalStudents),
  attendedStudents: Number(formData.attendedStudents),
  position: Number(formData.position),
  targetGivenByDt: Number(formData.targetGivenByDt),
  noOfStudentsSchedule: Number(formData.noOfStudentsSchedule),

  // ✅ Correct mapping for MongoDB schema
  interviewRounds: rounds.map((round) => ({
    roundType: round,
    status: formData.status, // default
    remarks: "", // optional placeholder
  })),
};

console.log(payload);

try {
  const resultAction = await dispatch(addGroomingThunk(payload));
  if (addGroomingThunk.fulfilled.match(resultAction)) {
    navigate("/search-grooming");
  } else {
    console.error("Failed to add grooming:", resultAction.payload);
  }
} catch (err) {
  console.error("Error adding grooming:", err);
}

  };

  const inputClass =
    "flex flex-col w-full min-h-[40px] border relative rounded-2xl focus-within:border-0 focus-within:border-b-2 focus-within:rounded-none transition-all duration-200";

  // Trainer dropdown component (unchanged)
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
        <div className="border p-2 rounded-2xl cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
          {selectedTrainers.length > 0 ? selectedTrainers.join(", ") : "-- Select Trainers --"}
        </div>
        {open && (
          <div className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto z-10">
            {allTrainers.map((trainer) => (
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

            {/* Deal Name */}
            <div className={`${inputClass} ${formData.dealName ? "border-0 border-b-2 rounded-none" : ""}`}>
              <div className="flex size-full absolute justify-center items-center px-2">
                <input
                  type="text"
                  name="dealName"
                  value={formData.dealName}
                  onChange={handleChange}
                  className="size-full outline-0"
                  id="dealName"
                />
                <MdDriveFileRenameOutline />
              </div>
              <label
                htmlFor="dealName"
                className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                  formData.dealName ? "top-[-10px] pl-2 text-xs" : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                }`}
              >
                Deal Name
              </label>
            </div>

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
              <label
                htmlFor="companyName"
                className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                  formData.companyName ? "top-[-10px] pl-2 text-xs" : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                }`}
              >
                Company Name
              </label>
            </div>

            {/* Date of Requirement */}
            <div className={`${inputClass}`}>
              <DatePicker
                selected={formData.dateOfRequirement}
                onChange={(date) => setFormData((prev) => ({ ...prev, dateOfRequirement: date }))}
                placeholderText="Date of Requirement"
                className="w-full outline-0 px-2 py-1 rounded-2xl"
              />
            </div>

            {/* Date of Interview */}
            <div className={`${inputClass}`}>
              <DatePicker
                selected={formData.dateOfInterview}
                onChange={(date) => setFormData((prev) => ({ ...prev, dateOfInterview: date }))}
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
              <label
                className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                  formData.skills ? "top-[-10px] pl-2 text-xs" : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                }`}
              >
                Skills
              </label>
            </div>

            {/* Trainers Dropdown */}
            <TrainerDropdown allTrainers={allTrainers} selectedTrainers={selectedTrainers} setSelectedTrainers={setSelectedTrainers} />

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
              <label
                className={`absolute pl-2 top-1.5 transition-all duration-200 ${
                  formData.subject ? "top-[-10px] pl-2 text-xs" : "[div:focus-within+&]:-top-2.5 [div:focus-within+&]:text-xs"
                }`}
              >
                Subject
              </label>
            </div>

            {/* Subject Trainer */}
            <div className={`p-2 ${inputClass} ${formData.subjectTrainerName ? "border-0 border-b-2 rounded-none" : ""}`}>
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
              <label
                htmlFor="groomingDays"
                className={`absolute pl-2 top-1.5 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs ${
                  formData.groomingDays ? "top-[-10px] pl-2 text-xs" : ""
                }`}
              >
                Grooming Days
              </label>
            </div>

            {/* Mode & Status */}
            <div className="flex gap-2">
              <div className={`p-2 ${inputClass} ${formData.mode ? "border-0 border-b-2 rounded-none" : ""}`}>
                <select name="mode" value={formData.mode} onChange={handleChange} className="w-full outline-0">
                  <option value="">-- Select Mode --</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className={`p-2 ${inputClass} ${formData.status ? "border-0 border-b-2 rounded-none" : ""}`}>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full outline-0">
                  <option value="">-- Select Status --</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
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
              <label
                htmlFor="totalStudents"
                className={`absolute pl-2 top-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${
                  formData.totalStudents ? "top-[-10px] pl-2 text-xs" : ""
                }`}
              >
                Total Students
              </label>
            </div>

            {/* Position & Target Given By DT */}
            <div className="flex gap-2">
              <div className={`${inputClass} ${formData.position ? "border-0 border-b-2 rounded-none" : ""}`}>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="0"
                />
                <label
                  htmlFor="position"
                  className={`absolute pl-2 top-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${
                    formData.position ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
                  Position
                </label>
              </div>

              <div className={`${inputClass} ${formData.targetGivenByDt ? "border-0 border-b-2 rounded-none" : ""}`}>
                <input
                  type="number"
                  name="targetGivenByDt"
                  value={formData.targetGivenByDt}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="0"
                />
                <label
                  htmlFor="targetGivenByDt"
                  className={`absolute pl-2 top-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${
                    formData.targetGivenByDt ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
                  Target Given By DT
                </label>
              </div>
            </div>

            {/* No of Students Schedule & Schedule Receive Date */}
            <div className="flex gap-2">
              <div className={`${inputClass} ${formData.noOfStudentsSchedule ? "border-0 border-b-2 rounded-none" : ""}`}>
                <input
                  type="number"
                  name="noOfStudentsSchedule"
                  value={formData.noOfStudentsSchedule}
                  onChange={handleChange}
                  className="size-full outline-0 px-2 peer"
                  min="0"
                />
                <label
                  htmlFor="noOfStudentsSchedule"
                  className={`absolute pl-2 top-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-xs duration-200 ${
                    formData.noOfStudentsSchedule ? "top-[-10px] pl-2 text-xs" : ""
                  }`}
                >
                  No of Students Schedule
                </label>
              </div>

              <div className={`${inputClass}`}>
                <DatePicker
                  selected={formData.scheduleReceiveDateFromDt}
                  onChange={(date) => setFormData((prev) => ({ ...prev, scheduleReceiveDateFromDt: date }))}
                  placeholderText="Schedule Receive Date From Dt"
                  className="w-full outline-0 px-2 py-1 rounded-2xl"
                />
              </div>
            </div>

            {/* Added By HR & Schedule Update */}
            <div className="flex gap-2">
              <div className={`p-2 ${inputClass} ${formData.addedByHR ? "border-0 border-b-2 rounded-none" : ""}`}>
                <select name="addedByHR" value={formData.addedByHR} onChange={handleChange} className="w-full outline-0">
                  <option value="">-- Select HR --</option>
                  <option value="bhumika">Bhumika</option>
                  <option value="amrutha">Amrutha</option>
                  <option value="supraja">Supraja</option>
                </select>
              </div>

              <div
                className={`p-2 ${inputClass} ${formData.scheduleUpdateInSoftware ? "border-0 border-b-2 rounded-none" : ""}`}
              >
                <select
                  name="scheduleUpdateInSoftware"
                  value={formData.scheduleUpdateInSoftware}
                  onChange={handleChange}
                  className="w-full outline-0"
                >
                  <option value="">-- Schedule Updated In Software --</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            {/* Interview Rounds */}
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
            <button type="submit" className="btn-primary w-full mt-4">
              Add Grooming
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddGrooming;
