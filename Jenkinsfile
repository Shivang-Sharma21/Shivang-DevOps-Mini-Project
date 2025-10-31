pipeline {
    agent any // Use any available Jenkins agent/server (your Windows machine)

    stages {
        stage('1. Checkout Code') {
            steps {
                // Jenkins connects to GitHub/GitLab and copies all project files to the workspace.
                echo 'Pulling the latest code from the Git repository...'
                checkout scm 
                echo 'Code successfully checked out.'
            }
        }
        
        stage('2. Deploy Static Content') {
            steps {
                echo 'Starting deployment to Jenkins workspace...'
                
                // Use 'bat' for Windows commands.
                // 1. Create the dedicated 'output' directory inside the Jenkins workspace.
                bat 'mkdir output' 
                
                // 2. Copy the website files into the 'output' folder.
                bat 'copy index.html output'
                bat 'copy styles.css output'
                bat 'copy script.js output'
                
                echo 'Deployment finished! The website files are now available in the /output folder of this job.'
            }
        }
    }
}