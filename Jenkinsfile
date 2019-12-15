pipeline {
  agent any
  stages {
    stage('Git pull') {
      steps {
        git 'https://github.com/CharlieKC/portfolio'
      }
    }

    stage('List files') {
      steps {
        sh 'ls'
      }
    }

    stage('compose up') {
      steps {
        sh '''ls;
apt install docker-compose;
docker-compose up;'''
      }
    }

  }
}