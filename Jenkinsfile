pipeline {
  agent {
    dockerfile {
      filename 'web/Dockerfile'
    }

  }
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

  }
}