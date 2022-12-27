console.log("Create Job js");

const createJobButton = document.getElementById("createJob");
const companyElement = document.getElementById("company");
const positionElement = document.getElementById("position");
const statusElement = document.getElementById("status");
const createJobCB = async (e) => {
  e.preventDefault();
  const company = companyElement.value;
  const position = positionElement.value;
  const status = statusElement.value;

  const data = { company, position, status };

  console.log(data);
  var token = sessionStorage.getItem("token");
  if (!token) window.location = "/";
  //   window.location = "/userHome";
  const res = await fetch("https://jobs-api-prod.onrender.com/api/v1/jobs", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log(res.status);
  if (res.status === 201) {
    const d = await res.json();
    console.log(d);

    window.location = "/userHome";
  } else {
    console.log(res.json());
    // window.location = "/error";
  }
};

createJobButton.addEventListener("click", createJobCB);
