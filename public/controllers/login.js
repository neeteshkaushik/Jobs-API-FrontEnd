console.log("Login js");

const loginJobButton = document.getElementById("loginBtn");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const loginJobCB = async (e) => {
  e.preventDefault();
  const email = emailElement.value;
  const password = passwordElement.value;

  const data = { email, password };

  console.log(data);
  try {
    const res = await fetch(
      "https://jobs-api-prod.onrender.com/api/v1/auth/login",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    console.log(res.status);

    if (res.status === 200) {
      const d = await res.json();
      console.log(d);
      sessionStorage.setItem("token", d.token);
      //   sessionStorage.setItem("user", d.user);
      window.location = `/userHome`;
    } else {
      window.location = "/";
      console.log(res.json());
    }
  } catch (error) {
    console.log("Error " + error);
  }

  //   window.location = "/userHome";
};

loginJobButton.addEventListener("click", loginJobCB);
