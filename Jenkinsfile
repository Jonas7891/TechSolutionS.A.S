pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1505233996735316008/NAA2bc0Iad1XAKHiZTtN_gY9eSxaNzUWS24RwG-L94dDHhLJYuBz9xdgqdGs9SuP-hrH'
    }

    stages {

        stage('Clonar repositorio') {
            steps {
                git branch: 'dev',
                    url: 'https://github.com/Esteban1807/TechSolutionS.A.S.git'
            }
        }

        stage('Verificar Node') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Instalar dependencias Backend') {
            steps {
                dir('src/backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Instalar dependencias Frontend') {
            steps {
                dir('src/frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('src/frontend') {
                    sh 'npm run build || echo "No build script found"'
                }
            }
        }
    }

    post {

        success {

            mail to: 'esteban.developer18@gmail.com',
            subject: 'SIUUU',
            body: 'La compilación terminó correctamente.'

            sh """
            curl -H "Content-Type: application/json" \
            -X POST \
            -d '{
                "content":"✅ Vamo lo pibe\\nProyecto: TechSolutionS.A.S"
            }' \
            $DISCORD_WEBHOOK
            """
        }

        failure {

            mail to: 'esteban.developer18@gmail.com',
            subject: 'PIPIPI',
            body: 'La compilación presentó errores.'

            sh """
            curl -H "Content-Type: application/json" \
            -X POST \
            -d '{
                "content":"❌Joder macho \\nProyecto: TechSolutionS.A.S"
            }' \
            $DISCORD_WEBHOOK
            """
        }
    }
}
