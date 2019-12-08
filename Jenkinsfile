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
            sh '''sudo curl -L --fail https://github.com/docker/compose/releases/download/1.21.2/run.sh -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
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
        sh 'sudo docker-compose up'
      }
    }

  }
}