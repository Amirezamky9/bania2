docker stop bania-container
docker rm bania-container
docker run -d -p 8080:80 --name bania-container bania-store