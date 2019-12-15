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
which docker-compose;
rm $(which docker-compose);
which docker-compose;
docker-compose up;'''
      }
    }

  }
}