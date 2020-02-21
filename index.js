const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const questions = [
    {
        message: 'What is your github username?',
        name: 'github',
        type: 'inpput'
    },
    {
        message: 'What is your project title?',
        name: 'title',
        typr: 'input'
    },
    {
        message: 'Please type in a short description of your project.',
        name: 'description',
        typr: 'input'
    },
    {
        message: 'What would you like to include in your table of contents?',
        type: 'checkbox',
        choices: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions'],
        name: 'toc',
    },
    {
        message: 'What should the user type for installation?',
        name: 'installation',
        typr: 'input'
    },
    {
        message: 'What should the user type to run the app?',
        name: 'usage',
        typr: 'input'
    },
    {
        message: 'What license will you choose for this project?',
        name: 'license',
        type: 'list',
        choices: ['MIT', 'None'],
    },
    {
        message: 'What should the user type to run tests?',
        name: 'test',
        typr: 'input'
    },
];

function init(){
    inquirer.prompt(questions).then(response=>{
        axios.get(`https://api.github.com/users/${response.github}`).then(res=>{
           writeFile({...response,...res.data})
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))        
};
function writeFile(data){
    
    let toc = '';
    data.toc.map(item=>{
        toc += `* [${item}](#${item})\n\n`
    });
    let license = data.license='https://img.shields.io/badge/license-MIT-blue.svg'
    let content = `# ${data.title}
    [![GitHub license](${license})](${data.html_url})
    ​
    ## Description
    ​
    ${data.description}
    ​
    ## Table of Contents
    ${toc}
    ​
    ## Installation
    ​
    To install application type in the following commands -
    ${data.installation}
    ## Usage
    ​
    ${data.usage}
    ​
    ## License
    ​
    This project is licensed under the ${data.license} license.
      
    ## Contributing
    ​
    GitHub + NodeJS + Git + Javascript + Hands
    ​
    ## Tests
    ​
    To run tests, run the following command:
    ​
    ${data.test}
    ​
    ## Questions
    ​
    <img src="${data.avatar_url}" alt="avatar" style="border-radius: 20px" width="80" />
    ​
    If you have any questions about the repo, open an issue or contact [${data.login}](${data.html_url}) directly.`
    fs.writeFile(`${data.title}.md`, content, function(err){       
        
    });
};

init();