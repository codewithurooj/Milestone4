// Select DOM elements with correct types
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const generateResumeButton = document.getElementById('generate-resume') as HTMLButtonElement;
const generatedResume = document.getElementById('generated-resume') as HTMLElement;
const resumeContent = document.getElementById('resume-content') as HTMLElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const saveChangesButton = document.getElementById('save-changes') as HTMLButtonElement;

// Function to escape HTML special characters (to prevent XSS)
function escapeHtml(text: string): string {
    const element = document.createElement('div');
    if (text) {
        element.innerText = text;
        element.textContent = text;
    }
    return element.innerHTML;
}

// Function to generate resume content
function generateResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const objective = (document.getElementById('objective') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;

    // Check if all fields are filled
    const fields = { name, email, phone, objective, experience, education };
    const missingFields: string[] = Object.keys(fields).filter(field => !fields[field]);

    if (missingFields.length > 0) {
        alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
    }

    // Escape user input to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedPhone = escapeHtml(phone);
    const escapedObjective = escapeHtml(objective);
    const escapedExperience = escapeHtml(experience);
    const escapedEducation = escapeHtml(education);

    // Handle profile picture if uploaded
    let profileImageHtml = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event: ProgressEvent<FileReader>): void {
            const imageUrl = event.target?.result as string;
            profileImageHtml = `<img src="${imageUrl}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">`;

            // Now generate the resume
            generateFinalResume(profileImageHtml, escapedName, escapedEmail, escapedPhone, escapedObjective, escapedExperience, escapedEducation);
        };

        reader.readAsDataURL(file); // Read the file as data URL
    } else {
        // If no image is selected, generate the resume without the image
        generateFinalResume(profileImageHtml, escapedName, escapedEmail, escapedPhone, escapedObjective, escapedExperience, escapedEducation);
    }
}

// Function to generate and display the final resume HTML
function generateFinalResume(profileImageHtml: string, name: string, email: string, phone: string, objective: string, experience: string, education: string): void {
    // Create the HTML for the resume
    const resumeHTML = `
        <div class="resume-section" contenteditable="true" id="name-section">
            <div class="profile-header">
                ${profileImageHtml}
                <h3>${name}</h3>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
            </div>
        </div>
        <div class="resume-section" contenteditable="true" id="objective-section">
            <h3>Career Objective</h3>
            <p>${objective}</p>
        </div>
        <div class="resume-section" contenteditable="true" id="experience-section">
            <h3>Experience</h3>
            <p>${experience}</p>
        </div>
        <div class="resume-section" contenteditable="true" id="education-section">
            <h3>Education</h3>
            <p>${education}</p>
        </div>
    `;

    // Insert generated HTML into the resume content
    resumeContent.innerHTML = resumeHTML;

    // Display the generated resume
    generatedResume.style.display = 'block';

    // Show the Save Changes button
    saveChangesButton.style.display = 'inline-block';
}

// Function to save the changes made to the resume
function saveChanges(): void {
    // Get the edited content from the editable sections
    const name = (document.getElementById('name-section') as HTMLElement).innerText;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const objective = (document.getElementById('objective-section') as HTMLElement).innerText;
    const experience = (document.getElementById('experience-section') as HTMLElement).innerText;
    const education = (document.getElementById('education-section') as HTMLElement).innerText;

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
