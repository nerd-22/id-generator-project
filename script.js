// Get form and elements
const form = document.getElementById('idForm');
const fullName = document.getElementById('fullName');
const dob = document.getElementById('dob');
const sex = document.getElementById('sex');
const nin = document.getElementById('nin');
const photo = document.getElementById('photo');
const clearBtn = document.getElementById('clearBtn');

// ID card elements
const frontPhoto = document.getElementById('frontPhoto');
const frontName = document.getElementById('frontName');
const frontDOB = document.getElementById('frontDOB');
const frontSex = document.getElementById('frontSex');
const frontNIN = document.getElementById('frontNIN');

const backNIN = document.getElementById('backNIN');
const qrCode = document.getElementById('qrCode');

// Load data from Local Storage if exists
window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if(savedData){
        fullName.value = savedData.fullName;
        dob.value = savedData.dob;
        sex.value = savedData.sex;
        nin.value = savedData.nin;
        photo.value = savedData.photo;
        generateID(savedData);
    }
}

// Form submit
form.addEventListener('submit', function(e){
    e.preventDefault();
    const userData = {
        fullName: fullName.value,
        dob: dob.value,
        sex: sex.value,
        nin: nin.value,
        photo: photo.value
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    generateID(userData);
});

// Clear Local Storage
clearBtn.addEventListener('click', function(){
    localStorage.removeItem('userData');
    location.reload();
});

// Function to generate ID
function generateID(data){
    // Front card
    frontPhoto.src = data.photo;
    frontName.textContent = "Name: " + data.fullName;
    frontDOB.textContent = "DOB: " + data.dob;
    frontSex.textContent = "Sex: " + data.sex;
    frontNIN.textContent = "NIN: " + data.nin;

    // Back card
    backNIN.textContent = "NIN: " + data.nin;
    QRCode.toCanvas(qrCode, data.nin, function (error) {
        if (error) console.error(error);
    });
}
