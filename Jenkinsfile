pipeline {
    agent any // Tells Jenkins to run this job on any available machine (your Windows machine)

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling the latest code from the Git repository for deployment...'
                // This step automatically checks out the code from your GitHub repository
                checkout scm 
                echo 'Code successfully checked out.'
            }
        }
        
        stage('2. Deploy Static Content') {
            steps {
                echo 'Starting deployment to Jenkins workspace...'
                
                // Use 'bat' command for running native Windows commands
                // 1. Create the dedicated 'output' directory inside the Jenkins job's workspace.
                bat 'mkdir output' 
                
                // 2. Copy the website files into the 'output' folder.
                // NOTE: Assumes your CSS file is named 'style.css' (singular)
                bat 'copy index.html output'
                bat 'copy style.css output'
                bat 'copy script.js output'
                
                echo 'Deployment finished! The website files are now available in the /output folder of this job.'
                // The full path is: C:\ProgramData\Jenkins\.jenkins\workspace\Shivang-Web-Deployment\output\
            }
        }
    }
}