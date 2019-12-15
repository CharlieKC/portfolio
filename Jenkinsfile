pipeline {
  agent any
  stages {
    stage('Git pull') {
      parallel {
        stage('Git pull') {
          steps {
            git 'https://github.com/CharlieKC/portfolio'
          }
        }

        stage('Install docker compose') {
          steps {
            sh '''curl -L --fail https://github.com/docker/compose/releases/download/1.21.2/run.sh -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
'''
          }
        }

      }
    }

    stage('List files') {
      steps {
        sh 'ls'
      }
    }

    stage('compose up') {
      steps {
        sh 'docker-compose up'
      }
    }

  }
}