
# DOHS AUTH Backend App with Docker

This project is a Dockerized Express application connected to a PostgreSQL database using Sequelize. Follow the instructions below to build and run the Docker image, and access the application on port 3001.

## Prerequisites

- Docker Desktop installed on your machine.
- Docker Compose (comes with Docker Desktop).

## Getting Started

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone -b dockerized-backend-auth https://github.com/Whitewater-Research-Group/dohs-frontend.git
cd your-repository
```


### 2. Configuration

Before building the Docker image, make sure to configure the environment variables. Create a `.env` file in the root directory with the following content:

```env
DB_HOST=db
DB_PORT=5432
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
PORT=3001
```

Replace the placeholder values with your actual PostgreSQL credentials.

### 3. Build and Start the Docker Containers

Use Docker Compose to build the Docker images and start the containers. This command will also start the PostgreSQL container and link it with your Express application.

```bash
docker-compose up --build
```

This command performs the following:

1. **Builds** the Docker images based on the `Dockerfile` and `docker-compose.yml`.
2. **Starts** the `express-app` container, which will be accessible on port 3001.
3. **Starts** the `postgres-db` container, which is accessible internally within Docker's network.

### 4. Access the Application

Once the containers are up and running, you can access the Express application in your web browser or API client:

```
http://localhost:3001
```

HOW TO TEST THE API USING POSTMAN: https://www.postman.com/supply-cosmonaut-2263908/workspace/dohs-auth-team/documentation/35575938-95db4d37-11ad-4ce0-8461-80b782eb892d

### 5. Stopping the Application

To stop and remove the running containers, use:

```bash
docker-compose down
```

This command will stop the containers and remove them, but it will not delete the images or volumes.

### 6. Rebuilding the Image

If you make changes to the application or Dockerfile, rebuild the Docker image and restart the containers with:

```bash
docker-compose up --build
```

### 7. Managing Docker Images and Containers

- **List Running Containers:**

    ```bash
    docker ps
    ```

- **Stop a Container:**

    ```bash
    docker stop <container_id_or_name>
    ```

- **Remove a Container:**

    ```bash
    docker rm <container_id_or_name>
    ```

- **List Docker Images:**

    ```bash
    docker images
    ```

- **Remove an Image:**

    ```bash
    docker rmi <image_id_or_name>
    ```

### Troubleshooting

- **Port Conflicts:** Ensure that port `3001` is not being used by another application on your host machine. You can modify the port mapping in `docker-compose.yml` if needed.
- **Logs:** Check the logs of your containers for any errors using:

    ```bash
    docker logs <container_id_or_name>
    ```


Thanks 