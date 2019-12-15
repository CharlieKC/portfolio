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
docker-compose -f ./docker-compose.yml up;'''
      }
    }

  }
}