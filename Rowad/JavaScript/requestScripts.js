let businessName = document.querySelector(".business_name");
let Name = businessName ? businessName.value : null;
let dataBtn = document.getElementById("data_btn");
let logo_description = document.getElementById("logo_description");
let selectroomtype = document.getElementById("selectroomtype");
let selectcolor = document.getElementById("selectcolor");
let selectbusiness = document.getElementById('selectbusiness');
let dataset = logo_description ? logo_description.value : null;
let generateImg = document.getElementById("custom-btnGenCall");
let login = document.querySelector('#log');
let signup = document.querySelector('#sign');



if (generateImg) {
  generateImg.addEventListener("click", () => {
    let isLogin = localStorage.getItem("token");
    if (isLogin) {
      GenerateImageData();
    } else {
      alert("Please Login First");
      window.location.href = "/ROWAD/HTML/login.html";
    }
  });
}




if (selectroomtype) {
  selectroomtype.addEventListener("input", () => {
    let data = localStorage.getItem('dataset');
    data = data + ` room type is ${selectroomtype.value}`;
    localStorage.setItem('dataset', data);
  });
}

if (selectcolor) {
  selectcolor.addEventListener("input", () => {
    let data = localStorage.getItem('dataset');
    data = data + ` color scheme  is ${selectcolor.value}`;
    localStorage.setItem('dataset', data);
  })
}
if(isLogin = localStorage.getItem("token")){

  login.style.display = 'none';
  signup.style.display = 'none';
  
}
else{
  login.style.display = 'block';
  signup.style.display = 'block';
 }


if (selectbusiness) {
  selectbusiness.addEventListener("input", () => {
    let data = localStorage.getItem('dataset');
    data = data + ` and business type we are considering is a ${selectbusiness.value}`;
    localStorage.setItem('dataset', data);
  });
}
if (logo_description) {
  logo_description.addEventListener("input", getDescription);
}

if (businessName) {
  businessName.addEventListener("input", () => {
    GetName();
  });
}


function GetName() {
  if (businessName) {
    Name = businessName.value;
    localStorage.setItem("Name", Name);
  }
}







function getDescription() {
  if (logo_description) {
    dataset = logo_description.value;
    localStorage.setItem("dataset", dataset);
  }
}






async function GenerateImageData() {
  generateImg.innerHTML = "Generating Image...";
  let data = "Use name " + (localStorage.getItem("Name")) + " for making logo and for more featured logo use this description " + (localStorage.getItem("dataset"));

  const response = await fetch("http://localhost:3001/api/v1/generateImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data
    })
  });

  if (!response.ok) { // check if HTTP status is 2xx
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  await response.json().then((data) => {
    localStorage.setItem("imageUrI", data.imageUrl);
    generateImg.innerHTML = "Generate";
    window.location.href = "/ROWAD/HTML/result.html";

    let resultant_image = document.getElementById("resultantimage");
    if (resultant_image) {
      resultant_image.src = localStorage.getItem("imageUrI");
      let downloadLink = document.getElementById("downloadpic");

      if (downloadLink) {
        downloadLink.href = imageUri;
        downloadLink.download = imageUri.split('/').pop();
      }
      localStorage.removeItem("imageUrI");
      localStorage.removeItem("dataset");
      localStorage.removeItem("Name");
    }
  })
}
