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
        stage ('unit tests') {
            parallel {
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
                stage('E2E test') {
                    agent {
                        docker {
                            image 'mcr.microsoft.com/playwright:v1.56.0-noble'
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                        set -e
                        npm install serve
                        node_modules/.bin/serve -s build &
                        SERVE_PID=\$!
                        sleep 10
                        npx playwright test --reporter=html
                        kill \$SERVE_PID
                        '''
                    }
                }
            }
        }   
    }
    post {
        always {
            junit 'jest-results/junit.xml'
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        }
    }
}