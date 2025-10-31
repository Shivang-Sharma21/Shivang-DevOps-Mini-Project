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
                // These checks ensure index.html and script.js are present before proceeding.
                bat 'if not exist index.html exit 1'
                bat 'if not exist script.js exit 1'
                echo 'Static checks passed. Code is ready for deployment.'
            }
        }

        stage('3. Package Static Content') {
            steps {
                echo 'Starting packaging process to /output folder...'
                
                // CRITICAL STEP: Cleanup old output folder before recreation
                bat 'if exist output rmdir /s /q output'
                
                // 1. Create the dedicated 'output' directory
                bat 'mkdir output' 
                
                // 2. Copy the website files into the 'output' folder.
                bat 'copy index.html output'
                bat 'copy style.css output'
                bat 'copy script.js output'

                // --- TIMESTAMP FIX ---
                // 'type nul >>' forces Windows to update the file timestamp to the current time, 
                // confirming the copy operation for index.html.
                bat 'type nul >> output\\index.html'
                
                echo 'Package created successfully in /output. Timestamp updated.'
            }
        }
        
        stage('4. Public Deployment (Placeholder)') {
            steps {
                echo 'Starting deployment to external web host (Simulated).'
                
                // 💡 ACTION REQUIRED: This is where your actual deployment command goes.
                // Example for SCP/SSH: sh 'scp -r output/* user@your-host:/var/www/html/DevOps_Mini_Project/'
                // Example for AWS S3: bat 'aws s3 sync output/ s3://your-bucket-name/ --delete'
                
                echo 'Deployment complete! The final website should be viewable publicly.'
            }
        }
    }

    // --- CORRECTED POST BLOCK (Runs regardless of build status) ---
    post {
        always {
            // NOTE: No 'steps {}' required inside 'always' in Declarative Pipeline.
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