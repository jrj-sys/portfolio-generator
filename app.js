const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;
    
//     console.log('Portfolio complete! Check out index.html to see the output.');
// });

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (REQUIRED)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!')
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub account name? (REQUIRED)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ])
}


const promptProject = portfolioData => {
    // If there isn't a projects array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    

    console.log(`
    =========================
        Add a New Project
    =========================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projName => {
                if (projName) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (REQUIRED):',
            validate: projDesc => {
                if (projDesc) {
                    return true;
                } else {
                    console.log('Please enter a project description!');
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node.js']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (REQUIRED)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter the link to your project GitHub repository.');
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About Me" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
}


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });



// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('================');
//     // Is the same as this...
//     profileDataArr.forEach((profileItem) => {
//         console.log(profileItem)
//     });
//     console.log('================');
//     // Is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

