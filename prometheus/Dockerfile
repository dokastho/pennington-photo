FROM ubuntu:latest
# FROM --platform=linux/amd64 ubuntu:latest

WORKDIR /app

COPY . /app

# Install packages from apt
RUN apt-get update
# For building & using db's
RUN apt-get install wget -y

RUN wget https://github.com/prometheus/prometheus/releases/download/v3.4.0/prometheus-3.4.0.linux-amd64.tar.gz
RUN tar xvfz prometheus-*.tar.gz
WORKDIR /app/prometheus-3.4.0.linux-amd64

# Set environment variables
ENV VIRTUAL_HOST=prometheus.dokastho.io
ENV VIRTUAL_PORT=9090
ENV PYTHONUNBUFFERED=0
ENV PROD=1

EXPOSE 9090

CMD [ "./prometheus", "--config.file=/app/prometheus.yaml" ]