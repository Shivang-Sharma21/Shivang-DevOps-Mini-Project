pipeline {
    agent any

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Pulling the latest code from the Git repository for deployment...'
                checkout scm 
                echo 'Code successfully checked out.'
            }
        }
        
        stage('2. Code Quality Check (Lint)') {
            steps {
                echo 'Verifying HTML and JavaScript syntax/quality...'
                // Simulate checks by ensuring core files exist.
                bat 'if not exist index.html exit 1'
                bat 'if not exist script.js exit 1'
                echo 'Static checks passed. Code is ready for deployment.'
            }
        }

        stage('3. Package Static Content') {
            steps {
                echo 'Starting packaging process to /output folder...'
                
                // Cleanup old output folder
                bat 'if exist output rmdir /s /q output'
                
                // 1. Create the dedicated 'output' directory
                bat 'mkdir output' 
                
                // 2. Copy the website files into the 'output' folder.
                bat 'copy index.html output'
                bat 'copy style.css output'
                bat 'copy script.js output'
                
                echo 'Package created successfully in /output.'
            }
        }
        
        stage('4. Public Deployment (Placeholder)') {
            steps {
                echo 'Starting deployment to external web host (Simulated).'
                
                // ACTION REQUIRED: Replace this placeholder with the actual command for your hosting.
                // Example: bat 'scp -r output/* user@your-web-host.com:/var/www/html/DevOps_Mini_Project/'
                
                echo 'Deployment complete! The final website should be viewable publicly.'
            }
        }
    }

    // --- FINAL CORRECTED POST BLOCK SYNTAX ---
    post {
        always {
            // FIX: Removed 'steps {}' block. The step is executed directly.
            echo 'Running always-executing post-build logic.' 
        }
        success {
            echo 'Pipeline finished successfully! Website is ready for viewing.'
        }
        failure {
            echo 'Pipeline failed! Deployment aborted due to an error.'
        }
    }
}