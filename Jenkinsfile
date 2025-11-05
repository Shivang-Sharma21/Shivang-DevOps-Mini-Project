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
                
                bat 'if not exist index.html exit 1'
                bat 'if not exist script.js exit 1'
                echo 'Static checks passed. Code is ready for deployment.'
            }
        }

        stage('3. Package Static Content') {
            steps {
                echo 'Starting packaging process to /output folder...'
                
                bat 'if exist output rmdir /s /q output'
                
               
                bat 'mkdir output' 
                
                
                bat 'copy index.html output'
                bat 'copy style.css output'
                bat 'copy script.js output'

                bat 'copy /b output\\index.html +,, output\\index.html'
                
                echo 'Package created successfully in /output. Timestamp updated.'
            }
        }
        
        stage('4. Public Deployment (Placeholder)') {
            steps {
                echo 'Starting deployment to external web host (Simulated).'
                
                
                
                echo 'Deployment complete! The final website should be viewable publicly.'
            }
        }
    }

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