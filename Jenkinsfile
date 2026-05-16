// Root-level repo — pair with credential aegisops-webhook-token (Secret text).
// Parameters: URL + incident type for one-click demos.

pipeline {
    agent any

    parameters {
        string(
            name: 'AEGISOPS_WEBHOOK_URL',
            defaultValue: 'https://YOUR_HOST/api/v1/webhooks/jenkins',
            trim: true
        )
        choice(
            name: 'INCIDENT',
            choices: ['test', 'peer', 'env'],
            description: 'npm script: incident:test | incident:peer | incident:env'
        )
    }

    environment {
        AEGISOPS_TOKEN = credentials('aegisops-webhook-token')
    }

    stages {
        stage('Run incident') {
            steps {
                script {
                    def cmd = 'npm run incident:test'
                    if (params.INCIDENT == 'peer') {
                        cmd = 'npm run incident:peer'
                    } else if (params.INCIDENT == 'env') {
                        cmd = 'npm run incident:env'
                    }
                    sh """
                        node -v
                        npm install
                        ${cmd}
                    """
                }
            }
        }
    }

    post {
        failure {
            script {
                def repoSlug = env.GIT_URL
                    ? env.GIT_URL.replace('https://github.com/', '').replace('.git', '')
                    : 'Usmansayed/Incident_test'
                def payload = groovy.json.JsonOutput.toJson([
                    repository : repoSlug,
                    run_id     : env.BUILD_NUMBER as Integer,
                    logs_excerpt: "Jenkins ${env.JOB_NAME} #${env.BUILD_NUMBER} (${params.INCIDENT}) — ${env.BUILD_URL}",
                    jenkins_build_url: env.BUILD_URL
                ])
                httpRequest(
                    url: params.AEGISOPS_WEBHOOK_URL,
                    httpMode: 'POST',
                    contentType: 'APPLICATION_JSON',
                    customHeaders: [[name: 'Authorization', value: "Bearer ${env.AEGISOPS_TOKEN}"]],
                    requestBody: payload,
                    validResponseCodes: '200:299',
                    quiet: true
                )
            }
        }
    }
}
