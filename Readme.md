# Automated CI/CD Pipeline & Containerized Deployment

A DevOps project demonstrating automated continuous integration, continuous delivery (CI/CD), and container lifecycle management. The project automatically builds, tests, packages, and deploys application containers upon code changes, with integrated system metrics collection and observability.

## 🛠 Tech Stack

* **Source Control:** GitHub

* **CI/CD Automation:** Jenkins

* **Containerization:** Docker & Docker Compose

* **Monitoring & Metrics:** Prometheus & cAdvisor

* **Visualization & Dashboards:** Grafana

* **Host Environment:** Ubuntu Linux (AWS EC2)

## 💻 Setup Instructions (Build & Run Locally)

Follow these steps to clone, configure, build, and run the project stack locally on your machine or server.

### 1. Prerequisites

Ensure the following tools are installed:

* Git

* Docker Engine (`>= 24.0`)

* Docker Compose (`>= 2.20`)

### 2. Clone the Repository

```
git clone https://github.com/praby07/DevOps-Capstone-Project.git
cd DevOps-Capstone-Project

```

### 3. Build & Run Application Containers

To build the Docker image and start the application container locally:

```
# Build the application image
docker build -t devops-app:latest .

# Run the container locally (mapped to host port 80)
docker run -d --name devops-app -p 80:80 devops-app:latest

```

### 4. Run the Full Stack (App + Observability)

To launch the application alongside the monitoring stack (cAdvisor, Prometheus, Grafana):

```
docker compose up -d --build

```

### 5. Verify Running Services

```
# Check running containers
docker ps

# View container logs
docker logs -f devops-app

```

## 🔄 CI/CD Flow Explained

The automated deployment pipeline follows an event-driven flow from commit to deployment:

```
[ Developer Push ] ──► [ GitHub Repository ]
                              │
                    (Webhook POST Event)
                              ▼
                  [ Jenkins Built-In Controller ]
                              │
                    ┌─────────┴─────────┐
                    │  Pipeline Stages  │
                    └─────────┬─────────┘
                              │
                1. Checkout Source Code
                2. Run Automated Tests
                3. Build Docker Image
                4. Deploy Container to Host
                              │
                              ▼
                [ Running Docker Containers ]
                              ▲
                              │ (Metrics Scrape)
                [ Prometheus & Grafana ]

```

1. **Trigger:** A developer pushes code changes to the target branch on GitHub.

2. **Webhook Event:** GitHub sends a `POST` request payload to the Jenkins controller endpoint (`http://35.77.116.155:8080/github-webhook/`).

3. **Checkout:** Jenkins detects the webhook trigger, launches the job executor, and pulls the latest source code from the repository.

4. **Build & Test:** Jenkins executes tests inside the pipeline environment and builds a fresh Docker image tagged with the build/commit reference.

5. **Continuous Deployment:** The pipeline stops the previously running application container, clears obsolete build artifacts, and runs the newly built container.

6. **Telemetry & Verification:** The deployed container is picked up by cAdvisor and Prometheus, making real-time CPU, memory, and runtime metrics visible on Grafana.