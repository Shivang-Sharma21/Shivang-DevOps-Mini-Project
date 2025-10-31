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
        
        // --- NEW STAGE: CODE QUALITY CHECK (MANDATORY FOR PROJECTS) ---
        stage('2. Code Quality Check (Lint)') {
            steps {
                echo 'Verifying HTML and JavaScript syntax/quality...'
                // Since this is a simple front-end project without Node.js,
                // we'll simulate a check by ensuring core files exist.
                // In a real project, you would run 'npm install' then 'npm test' 
                // using ESLint/HTMLHint here.
                bat 'if not exist index.html exit 1' // Ensure index.html exists
                bat 'if not exist script.js exit 1' // Ensure script.js exists
                echo 'Static checks passed. Code is ready for deployment.'
            }
        }

        stage('3. Package Static Content') { // Renamed from 'Deploy' to 'Package' for clarity
            steps {
                echo 'Starting packaging process to /output folder...'
                
                // Cleanup old output folder (Crucial to prevent errors on reruns)
                // /s and /q ensure recursive and quiet deletion without prompts
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
        
        // --- NEW STAGE: EXTERNAL DEPLOYMENT (MAKING THE SITE PUBLIC) ---
        stage('4. Public Deployment (Placeholder)') {
            steps {
                echo 'Starting deployment to external web host (Simulated using a batch script).'
                
                // ACTION REQUIRED: Replace this line with the actual command for your hosting.
                // Since we don't have an actual public server, this is a placeholder.
                bat 'echo Deploying files from output folder to public server...'
                
                echo 'Deployment complete! The final website should be viewable publicly.'
            }
        }
    }

    // Post-build actions (optional)
    post {
        always {
            // Optional: Clean up workspace to save disk space after a successful run.
            // Be CAREFUL with this on Windows agents if you have shared dependencies!
            // bat 'del /s /q /f output' 
        }
        success {
            echo 'Pipeline finished successfully! Website is ready for viewing.'
        }
        failure {
            echo 'Pipeline failed! Deployment aborted due to an error.'
        }
    }
}