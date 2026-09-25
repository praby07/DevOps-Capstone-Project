pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'prabhastr'
        IMAGE_NAME      = 'devops-capstone'
        CONTAINER_NAME  = 'devops-capstone-container'
        APP_PORT        = '3000'
        DOCKER_CREDS    = credentials('dockerhub-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
                sh "docker run -d -p ${APP_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            sh 'docker image prune -f'
        }
        failure {
            echo "Pipeline failed. Check the console output for error details."
        }
    }
}
