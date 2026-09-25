pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-capstone .'
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    try {
                        sh 'docker stop devops-capstone-container'
                        sh 'docker rm devops-capstone-container'
                    } catch (Exception e) {
                        echo 'Container does not exist, proceeding...'
                    }
                    sh 'docker run -d -p 3000:3000 --name devops-capstone-container devops-capstone'
                }
            }
        }
    }
}
