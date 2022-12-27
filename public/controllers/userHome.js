console.log("USer Home");

const deleteButtons = document.querySelectorAll(".deleteBtn");
const updateButtons = document.querySelectorAll(".updateBtn");
const jobsDiv = document.getElementById("allJobs");
const updateJobDiv = document.getElementById("updateJob");
const logoutElement = document.getElementById("logout");

const deleteJobCB = async (e) => {
  console.log("clicked delete");
  const jobId = e.srcElement.value;
  console.log(e.srcElement.value);
  let token = sessionStorage.getItem("token");
  console.log("clicked delete");
  if (!token) {
    window.location = "/";
  } else {
    token = "Bearer " + token;
    const res = await fetch(
      `https://jobs-api-prod.onrender.com/api/v1/jobs/${jobId}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
      }
    );

    const data = await res.json();
    jobsDiv.removeChild(document.getElementById(`job-${jobId}`));
  }
};
const updateJobPostCB = async (e) => {
  const jobId = e.target.getAttribute("value");
  console.log(e.target.getAttribute("value"));
  let token = sessionStorage.getItem("token");
  const company = document.getElementById("company").value;
  const position = document.getElementById("position").value;
  const status = document.getElementById("status").value;
  const data = { company, position, status };
  console.log(company, position, status);
  console.log("clicked update job");
  if (!token) {
    window.location = "/";
  } else {
    token = "Bearer " + token;
    const res = await fetch(
      `https://jobs-api-prod.onrender.com/api/v1/jobs/${jobId}`,
      {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
        body: JSON.stringify(data),
      }
    );
    // console.log(res.json());
    const updatedRes = await res.json();
    const job = updatedRes.updatedJob;
    console.log(job);
    const divToUpdate = document.getElementById(`job-${jobId}`).firstChild;
    divToUpdate.textContent = `${job.position} at ${job.company} , current status : ${job.status}`;
    updateJobDiv.innerHTML = "";
  }
};

const updateJobCB = async (e) => {
  const jobId = e.target.getAttribute("value");
  console.log(e.target.getAttribute("value"));
  let token = sessionStorage.getItem("token");
  console.log("clicked update job");
  if (!token) {
    window.location = "http://127.0.0.1:5500/Jobs/index.html?";
  } else {
    token = "Bearer " + token;
    const res = await fetch(
      `https://jobs-api-prod.onrender.com/api/v1/jobs/${jobId}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
      }
    );
    updateJobDiv.innerHTML = "";
    const data = await res.json();
    const job = data.job;
    // console.log("Data to be updated :");
    // const ele = document.createElement("p");
    // ele.innerText = `${job.position} at ${job.company} , current status : ${job.status}`;
    console.log(job.position);
    const editEle = ` <label for="company">Company</label>
    <input id="company" name="company" type="text" value=${job.company} />
    <label for="position">Position</label>
    <input id="position" name="position" type="text" value='${job.position}' />
    <label for="status">Choose a status:</label>

    <select id="status">
    <option value="pending">pending</option>
    <option value="selected">selected</option>
    <option value="interview">interview</option>
    <option value="rejected">rejected</option>
    </select>
    `;
    // updateJobDiv.appendChild(ele);
    updateJobDiv.innerHTML = editEle;
    const updateButton = document.createElement("button");
    updateButton.id = "submitUpdateButton";
    updateButton.textContent = "Update Job";
    updateButton.addEventListener("click", updateJobPostCB);
    updateButton.setAttribute("value", job._id);
    updateJobDiv.appendChild(updateButton);
    console.log(job);

    //jobsDiv.removeChild(document.getElementById(`job-${jobId}`));
  }
};

const getJobsCB = async () => {
  let token = sessionStorage.getItem("token");
  console.log("fetching all jobs");
  if (!token) {
    window.location = "/";
  } else {
    token = "Bearer " + token;
    const res = await fetch("https://jobs-api-prod.onrender.com/api/v1/jobs/", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        authorization: token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body data type must match "Content-Type" header
    });

    const data = await res.json();
    const jobs = data.jobs;
    console.log(jobs);
    jobsDiv.innerHTML = "";
    jobs.forEach((job) => {
      const ele = document.createElement("div");
      ele.id = `job-${job._id}`;
      const deleteButton = document.createElement("button");
      const updateButton = document.createElement("button");
      updateButton.setAttribute("value", job._id);
      updateButton.innerText = "update";
      updateButton.className = "updateBtn";
      updateButton.addEventListener("click", updateJobCB);
      deleteButton.className = "deleteBtn";
      deleteButton.innerText = "delete job";
      deleteButton.setAttribute("value", job._id);
      deleteButton.addEventListener("click", deleteJobCB);
      const para = document.createElement("p");
      para.textContent = `${job.position} at ${job.company} , current status : ${job.status}`;
      ele.appendChild(para);
      ele.appendChild(deleteButton);
      ele.appendChild(updateButton);
      jobsDiv.appendChild(ele);
      //   jobsDiv.appendChild(deleteButton);
      console.log(jobsDiv);
      console.log(job.company);
    });
  }
};

// console.log(deleteButtons.length);
// deleteButtons.forEach((element) => {
//   element.addEventListener("click", deleteJobCB);
// });

// updateButtons.forEach((element) => {
//   element.addEventListener("click", updateJobCB);
// });

const logoutCB = async () => {
  sessionStorage.removeItem("token");
  window.location = "/";
};
logoutElement.addEventListener("click", logoutCB);
getJobsCB();
