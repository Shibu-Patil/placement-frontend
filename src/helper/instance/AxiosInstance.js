import axios from "axios";

// Placeholder; will be updated dynamically
let BASEURL = `http://${window.location.hostname}:5000/api`;

let AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
});

// Dynamically update AxiosInstance by fetching backend IP
async function updateAxiosInstance() {
  try {
    const res = await fetch(`${BASEURL.replace("/api", "")}/api/ip`);
    const data = await res.json();

    if (data?.fullUrl) {
      BASEURL = `${data.fullUrl}/api`;

    //   console.log(BASEURL);
      
      AxiosInstance = axios.create({
        baseURL: BASEURL,
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ AxiosInstance updated dynamically:", BASEURL);
    }
  } catch (err) {
    console.warn("⚠️ Failed to detect backend IP, using default:", BASEURL);
  }
}

// Immediately try to update dynamically
updateAxiosInstance();

export default AxiosInstance;
