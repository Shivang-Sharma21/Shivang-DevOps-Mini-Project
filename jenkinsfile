// Define the entire automated pipeline
pipeline {
    agent any

    // Define the environment variable for your target deployment path
    environment {
        // !!! REPLACE THIS WITH THE ACTUAL ROOT OF YOUR WEB SERVER !!!
        // Example for Apache: '/var/www/html/shivang-site/' 
        // Example for Nginx: '/usr/share/nginx/html/shivang-site/' 
        DEPLOY_PATH = '/var/www/html/shivang-site/' 
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                // This step will connect to your remote Git repo (set up in the Jenkins UI)
                checkout scm
                echo 'Code successfully checked out.'
            }
        }
        
        stage('2. Deploy Static Content') {
            steps {
                echo "Attempting deployment to ${env.DEPLOY_PATH}"
                
                // 1. Create the final directory if it doesn't exist
                // NOTE: 'sudo' is required here if the Jenkins user doesn't have permissions
                sh "sudo mkdir -p ${env.DEPLOY_PATH}"

                // 2. Copy ALL files (*.*) and the images folder (-rf) to the destination
                sh "sudo cp -rf * ${env.DEPLOY_PATH}" 
                
                echo "Deployment complete! Site is now live."
            }
        }
    }
}