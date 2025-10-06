pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                   ls -la
                   node --version
                   npm --version
                   npm ci
                   npm run build
                   ls -la
                '''
            }
        }
        stage('test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                   test -f build/index.html
                   npm test
                '''
            }
        }
        stage('E2E test'){
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.56.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                   sudo npm install -g server
                   sudo serve -s build
                   sudo npx playright test 
                '''
            }
        }
    }
}