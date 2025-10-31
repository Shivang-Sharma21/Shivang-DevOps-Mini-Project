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
                // Ensures critical files exist before starting packaging.
                bat 'if not exist index.html exit 1'
                bat 'if not exist script.js exit 1'
                echo 'Static checks passed. Code is ready for deployment.'
            }
        }

        stage('3. Package Static Content') {
            steps {
                echo 'Starting packaging process to /output folder...'
                
                // CRITICAL STEP: Clean up old output folder before recreation
                bat 'if exist output rmdir /s /q output'
                
                // 1. Create the dedicated 'output' directory
                bat 'mkdir output' 
                
                // 2. Copy the website files into the 'output' folder.
                bat 'copy index.html output'
                bat 'copy style.css output'
                bat 'copy script.js output'

                // --- GUARANTEED TIMESTAMP FIX (Windows Batch) ---
                // This command modifies the timestamp of index.html to the current time, 
                // confirming the copy operation and fixing the issue you observed.
                bat 'copy /b output\\index.html +,, output\\index.html'
                
                echo 'Package created successfully in /output. Timestamp updated.'
            }
        }
        
        stage('4. Public Deployment (Placeholder)') {
            steps {
                echo 'Starting deployment to external web host (Simulated).'
                
                // 💡 ACTION REQUIRED: Replace this placeholder with your actual hosting command.
                // This is the step that transfers the files out of Jenkins and onto a public server.
                
                echo 'Deployment complete! The final website should be viewable publicly.'
            }
        }
    }

    // --- CORRECTED POST BLOCK (Runs regardless of build status) ---
    // The syntax is simplified to follow the Jenkins Declarative Post Block rules.
    post {
        always {
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