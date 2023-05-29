pipeline {
	agent any
	stages {
		stage("verify tooling") {
			steps {
				sh '''
					docker version
					docker info
				'''
			}
		}
		stage("install node_modules") {
			steps {
				script {
				sh 'npm i'
				}
			}
		}
		stage('tests') {
			steps {
				script {
				sh 'npm run test:ci'
				}
			}
			post {
				always {
				step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml', lineCoverageTargets: '100, 95, 50'])
				}
			}
		}
		stage("stop container") {
			steps {
				sh 'docker stop receive_service || true'
			}
		}
		stage("remove old image") {
			steps {
				sh 'docker rmi receive-service || true'
			}
		}
		stage("remove unused containers and images") {
			steps {
				sh 'docker system prune -af'
			}
		}
		stage("build typescript") {
			steps {
				sh 'npm run build'
			}
		}
		stage("build docker image") {
			steps {
				sh 'docker build -t receive-service .'
			}
		}
		stage("run") {
			steps {
				sh '''
                    docker run -d \
                    -e HOST=receive_service \
                    -e JWT_SECRET=1kZDnw8==jh \
					-e KAFKA_CLIENTID=rem-kafka \
					-e KAFKA_BROKER_PORT=9092 \
        			-e KAFKA_BROKER_HOST=broker \
					-e ADMIN_EMAIL=gui.acassemiro@gmail.com \
					-e PORT=3004 \
					-e MONGO_HOST=mongo \
					-e MONGO_PORT=27017 \
					-e MONGO_DB_NAME=rem \
					-e MONGO_PASS=rem2023 \
					-e MONGO_USER=rem \
					-p 3004:3004 \
					--hostname receive_service \
                    --network rem_network \
					--restart always \
					--name receive_service receive-service
				'''
			}
		}
	}
}