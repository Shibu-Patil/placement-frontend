import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Nav = () => {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);

  // ✅ Get grooming data from Redux
  const { allGrooming } = useSelector((state) => state.authReducer);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setShowArrow(!atEnd);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  // ✅ Handle Excel download
  const handleDownload = () => {
    if (!allGrooming || allGrooming.length === 0) {
      toast.error("No grooming data available to export!");
      return;
    }

    toast.loading("Preparing HR Report...");

    try {
      const flattenedData = allGrooming.map((item) => ({
        CompanyName: item.companyName || "",
        AddedByHR: item.addedByHR || "",
        Subject: item.subject || "",
        SubjectTrainer: item.subjectTrainer?.name || "",
        Skills: Array.isArray(item.skills) ? item.skills.join(", ") : "",
        InterviewRounds: Array.isArray(item.interviewRounds)
          ? item.interviewRounds
              .map((r) => `${r.roundType} (${r.status})`)
              .join(", ")
          : "",
        TotalStudents: item.totalStudents || 0,
        ScheduledStudents: item.noOfStudentsSchedule || 0,
        AttendedStudents: item.attendedStudents || 0,
        PlacedStudents: Array.isArray(item.placedStudents)
          ? item.placedStudents.join(", ")
          : "",
        RejectedStudents: Array.isArray(item.rejectedStudents)
          ? item.rejectedStudents.join(", ")
          : "",
        GroomingDays: item.groomingDays || "",
        Mode: item.mode || "",
        Position: item.position || "",
        DealName: item.dealName || "",
        ScheduleUpdateInSoftware: item.scheduleUpdateInSoftware ? "Yes" : "No",
        DateOfRequirement: item.dateOfRequirement
          ? new Date(item.dateOfRequirement).toLocaleDateString()
          : "",
        DateOfInterview: item.dateOfInterview
          ? new Date(item.dateOfInterview).toLocaleDateString()
          : "",

      }));

      const worksheet = XLSX.utils.json_to_sheet(flattenedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "HR Report");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const date = new Date().toLocaleDateString("en-GB").replaceAll("/", "-");
      saveAs(blob, `HR_Report_${date}.xlsx`);

      toast.dismiss();
      toast.success("HR Report downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to download HR Report!");
      console.error(error);
    }
  };

  return (
    <nav className="flex w-full h-16 bg-yellow-300 shadow-[0px_0px_20px_2px_#111] sticky top-0 pr-6">
      {/* Left Logo */}
      <div className="w-1/4 h-full">
        <div className="w-[150px] h-full flex justify-center items-center mt-1">
          {/* SVG Animation */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" className="size-full">
            <text
              x="220"
              y="220"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="80"
              fontWeight="bold"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="700"
              strokeDashoffset="700"
            >
              SPIDERS
              <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2s" fill="freeze" />
            </text>
            <text
              x="220"
              y="220"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="80"
              fontWeight="bold"
              fill="black"
              opacity="0"
            >
              SPIDERS
              <animate attributeName="opacity" from="0" to="1" begin="2s" dur="1s" fill="freeze" />
            </text>
          </svg>
        </div>
      </div>

      <div className="w-1/4"></div>

      {/* Navigation Links */}
      <div
        className="w-2/4 h-full flex items-center font-semibold gap-12 text-nowrap overflow-x-scroll"
        ref={scrollRef}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-groomming">Add Grooming</NavLink>
        <NavLink to="/add-trainers">Add Trainers</NavLink>
        <NavLink to="/search-grooming">Search Grooming</NavLink>

        {/* ✅ Download Button */}
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
        >
          Download HR Report
        </button>

        <NavLink>Trainers performance</NavLink>
      </div>

      {/* Right Scroll Arrow */}
      {showArrow && (
        <div className="fixed right-1 top-5 text-2xl text-gray-700 animate-pulse">
          <IoMdArrowDroprightCircle />
        </div>
      )}
    </nav>
  );
};

export default Nav;
