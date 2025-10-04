// SearchGrooming.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendar, FaUsers, FaLaptop, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaCircleDot } from "react-icons/fa6";
import { deleteGroomingThunk } from "../../../slices/AuthSlice";
const InterviewCard = ({ data, onUpdate, onDelete, colo }) => {
  // console.log(data.reasons);
  
  return (
    <div className={`w-full max-w-lg rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-200 ${colo}`}>
      
      {/* Company + Mode */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{data.companyName}</h2>
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium flex gap-3 justify-center items-center">
          {data.mode} {data.mode=="Online"&& <FaCircleDot className="fill-green-600"/>}
        </span>
        
      </div>

      {/* Subject & Trainers */}
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Subject:</span> {data.subject}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Trainer:</span> {data.subjectTrainer?.name}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Other Trainers:</span>{" "}
        {data.trainers.map((t) => t.name).join(", ")}
      </p>

      {/* Dates */}
      <div className="flex justify-start mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm w-1/2">
          <FaCalendar className="w-4 h-4" />
          <span>Interview: {data.dateOfInterview ? new Date(data.dateOfInterview).toLocaleDateString() : "Not Scheduled"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm w-1/2">
          <FaCalendar className="w-4 h-4" />
          <span>Requirement: {new Date(data.dateOfRequirement).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Time + Grooming */}
      <div className="flex justify-start mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm w-1/2">
          <FaClock className="w-4 h-4" />
          <span>Interval: {data.timeInterval} hrs</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm w-1/2">
          <FaLaptop className="w-4 h-4" />
          <span>Grooming: {data.groomingDays} days</span>
        </div>
      </div>

      {/* Students Info */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-4">
        <div className="text-gray-700">
          <span className="font-semibold">Total:</span> {data.totalStudents}
        </div>
        <div className="text-green-600 font-semibold">
          Attended: {data.attendedStudents}
        </div>
        <div className="text-red-500 font-semibold">
          Rejected: {data.rejectedStudents[0]}
        </div>
        <div className="text-blue-600 font-semibold">
          Placed: {data.placedStudents[0]}
        </div>
      </div>

      {/* Rejection Reason */}
<div className="h-20">
        {data.rejectedStudents.length > 0 && data.reasons.length>0 && (
        <div className="mb-4 text-red-600 break-all w-full h-full overflow-y-scroll">
          <span className="font-semibold">Reason of Rejection:</span> {data.reasons[0]}
        </div>
      )}

</div>
      {/* Skills */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-700">Skills:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onUpdate(data)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const SearchGrooming = () => {
  let { allGrooming } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleUpdate = (item) => {
    navigate("/update-grooming", { state: item });
  };

  const handleDelete = (id) => {
    console.log("Delete clicked:", id);
    dispatch(deleteGroomingThunk(id))
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Groomings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allGrooming?.map((item) => (
          <InterviewCard
            key={item._id}
            data={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            colo={!item.dateOfInterview ? "bg-red-200" : "bg-lime-100"}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchGrooming;
