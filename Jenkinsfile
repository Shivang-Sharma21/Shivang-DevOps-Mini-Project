pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling the latest code from the Git repository for deployment...'
                // This checks out the code from GitHub to the Jenkins workspace
                checkout scm 
                echo 'Code successfully checked out.'
            }
        }
        
        stage('2. Deploy Static Content') {
            steps {
                echo 'Starting deployment to Jenkins workspace (with cleanup)...'
                
                // Use 'bat' for Windows commands.
                // 1. CLEANUP: Safely remove the old 'output' folder if it exists.
                // 'if exist' prevents failure on the very first run. '/s /q' forces quiet, recursive delete.
                bat 'if exist output rmdir /s /q output'
                
                // 2. Create the dedicated 'output' directory.
                bat 'mkdir output' 
                
                // 3. Copy the website files into the 'output' folder.
                // Assuming CSS file is named 'style.css' (singular)
                bat 'copy index.html output'
                bat 'copy style.css output' 
                bat 'copy script.js output'
                
                echo 'Deployment finished successfully!'
            }
        }
    }
}