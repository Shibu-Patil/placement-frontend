import axios from "axios";

let BASEURL = `http://${window.location.hostname}:5000/api`;

let AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
});

async function updateAxiosInstance() {
  const subnet = "192.168.0"; // change if your LAN differs
  const timeout = 700; // ms
  const cached = localStorage.getItem("lastBackend");

  // 🔹 Try cached backend first (super fast)
  if (cached) {
    try {
      const test = await fetch(`${cached.replace("/api", "")}/api/ip`, { method: "HEAD", cache: "no-store" });
      if (test.ok) {
        BASEURL = cached;
        AxiosInstance = axios.create({ baseURL: BASEURL, headers: { "Content-Type": "application/json" } });
        console.log("✅ Cached backend active:", BASEURL);
        return;
      } else {
        console.warn("⚠️ Cached backend not responding, rescanning...");
      }
    } catch {
      console.warn("⚠️ Cached backend failed, rescanning...");
    }
  }

  // 🔹 Build subnet IP list
  const ips = Array.from({ length: 255 }, (_, i) => `${subnet}.${i + 1}`);
  const controllers = [];

  // 🔹 Wrap each fetch with timeout and signal
  const tryIP = (ip) =>
    new Promise(async (resolve, reject) => {
      const controller = new AbortController();
      controllers.push(controller);
      const url = `http://${ip}:5000/api`;
      const timer = setTimeout(() => controller.abort(), timeout);

      try {
        const res = await fetch(`${url.replace("/api", "")}/api/ip`, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          resolve(`${data?.fullUrl || `http://${ip}:5000`}/api`);
        } else reject();
      } catch {
        clearTimeout(timer);
        reject();
      }
    });

  // 🔹 Fire all 255 requests at once, stop at first success
  try {
    const workingURL = await Promise.any(ips.map(tryIP));

    controllers.forEach((c) => c.abort()); // stop others

    BASEURL = workingURL;
    AxiosInstance = axios.create({
      baseURL: BASEURL,
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("lastBackend", BASEURL);
    console.log("✅ Connected to backend:", BASEURL);
  } catch {
    console.warn("⚠️ No backend reachable, using default:", BASEURL);
  }
}

updateAxiosInstance();

export default AxiosInstance;
