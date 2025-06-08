pipeline {
    agent any
    
    environment {
        GITHUB_REPO = 'https://github.com/Jinliliu99/KongHomeAssginment.git'
        DOCKER_COMPOSE_FILE = 'https://drive.google.com/file/d/1ZqYLsFhcBAseFofEV8YCcOt4vZnItiBi/view?pli=1'
        KONG_UI_URL = 'http://localhost:8002'
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
    }
    
    stages {
        stage('=fetch cypress code') {
            steps {
                checkout scm: [
                    $class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: env.GITHUB_REPO]]
                ]
                sh 'ls -la'
            }
        }
        
        stage('build kong gateway') {
            steps {
                sh 'mkdir -p docker && cd docker && wget $DOCKER_COMPOSE_FILE'
                sh 'cd docker && docker-compose up -d'
                sh 'sleep 30' 
                
                // verify if kong gateway is running
                sh 'curl --fail --retry 5 --retry-delay 5 $KONG_UI_URL'
            }
        }
        
        stage('run cypress test, send email and report') {
            steps {
                sh 'npm install'
                sh 'npx cypress run'
            }
        }
        
    }
    
    post {
        always {
            sh 'cd docker && docker-compose down'
        }
    }
} 