// Select DOM elements with correct types
var resumeForm = document.getElementById('resume-form');
var generateResumeButton = document.getElementById('generate-resume');
var generatedResume = document.getElementById('generated-resume');
var resumeContent = document.getElementById('resume-content');
var profilePictureInput = document.getElementById('profile-picture');
var saveChangesButton = document.getElementById('save-changes');
// Function to escape HTML special characters (to prevent XSS)
function escapeHtml(text) {
    var element = document.createElement('div');
    if (text) {
        element.innerText = text;
        element.textContent = text;
    }
    return element.innerHTML;
}
// Function to generate resume content
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var objective = document.getElementById('objective').value;
    var experience = document.getElementById('experience').value;
    var education = document.getElementById('education').value;
    // Check if all fields are filled
    var fields = { name: name, email: email, phone: phone, objective: objective, experience: experience, education: education };
    var missingFields = Object.keys(fields).filter(function (field) { return !fields[field]; });
    if (missingFields.length > 0) {
        alert("Please fill in the following fields: ".concat(missingFields.join(', ')));
        return;
    }
    // Escape user input to prevent XSS
    var escapedName = escapeHtml(name);
    var escapedEmail = escapeHtml(email);
    var escapedPhone = escapeHtml(phone);
    var escapedObjective = escapeHtml(objective);
    var escapedExperience = escapeHtml(experience);
    var escapedEducation = escapeHtml(education);
    // Handle profile picture if uploaded
    var profileImageHtml = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            var imageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            profileImageHtml = "<img src=\"".concat(imageUrl, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\">");
            // Now generate the resume
            generateFinalResume(profileImageHtml, escapedName, escapedEmail, escapedPhone, escapedObjective, escapedExperience, escapedEducation);
        };
        reader.readAsDataURL(file); // Read the file as data URL
    }
    else {
        // If no image is selected, generate the resume without the image
        generateFinalResume(profileImageHtml, escapedName, escapedEmail, escapedPhone, escapedObjective, escapedExperience, escapedEducation);
    }
}
// Function to generate and display the final resume HTML
function generateFinalResume(profileImageHtml, name, email, phone, objective, experience, education) {
    // Create the HTML for the resume
    var resumeHTML = "\n        <div class=\"resume-section\" contenteditable=\"true\" id=\"name-section\">\n            <div class=\"profile-header\">\n                ".concat(profileImageHtml, "\n                <h3>").concat(name, "</h3>\n                <p>Email: ").concat(email, "</p>\n                <p>Phone: ").concat(phone, "</p>\n            </div>\n        </div>\n        <div class=\"resume-section\" contenteditable=\"true\" id=\"objective-section\">\n            <h3>Career Objective</h3>\n            <p>").concat(objective, "</p>\n        </div>\n        <div class=\"resume-section\" contenteditable=\"true\" id=\"experience-section\">\n            <h3>Experience</h3>\n            <p>").concat(experience, "</p>\n        </div>\n        <div class=\"resume-section\" contenteditable=\"true\" id=\"education-section\">\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n        </div>\n    ");
    // Insert generated HTML into the resume content
    resumeContent.innerHTML = resumeHTML;
    // Display the generated resume
    generatedResume.style.display = 'block';
    // Show the Save Changes button
    saveChangesButton.style.display = 'inline-block';
}
// Function to save the changes made to the resume
function saveChanges() {
    // Get the edited content from the editable sections
    var name = document.getElementById('name-section').innerText;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var objective = document.getElementById('objective-section').innerText;
    var experience = document.getElementById('experience-section').innerText;
    var education = document.getElementById('education-section').innerText;
    // Optionally, you can save this content to localStorage or a database
    localStorage.setItem('resumeName', name);
    localStorage.setItem('resumeEmail', email);
    localStorage.setItem('resumePhone', phone);
    localStorage.setItem('resumeObjective', objective);
    localStorage.setItem('resumeExperience', experience);
    localStorage.setItem('resumeEducation', education);
    alert('Changes saved successfully!');
}
// Add event listener to the "Generate Resume" button
generateResumeButton.addEventListener('click', generateResume);
// Add event listener to the "Save Changes" button
saveChangesButton.addEventListener('click', saveChanges);
