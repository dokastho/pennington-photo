FROM --platform=linux/amd64 python:3.9.6

WORKDIR /app

COPY . /app

# Install packages from apt
RUN apt-get update
# For building & using db's
RUN apt-get install sqlite3 -y
# For facilitating connections
RUN apt-get install sshpass -y

# Install dependencies
RUN python3 -m pip install --no-cache-dir -r requirements.txt
RUN pip install -e .

# Build frontend
RUN mkdir /app/pennington_photo/static/js
WORKDIR /app/pennington_photo
ENV NODE_VERSION=22.7.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm i
RUN npm run build
WORKDIR /app

# Build DB
RUN mkdir /app/pennington_photo/var
WORKDIR /app/pennington_photo
RUN ./bin/sitedb create
WORKDIR /app

# Expose the port Flask runs on
EXPOSE 8186

# Set environment variables
ENV FLASK_APP=pennington_photo
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONUNBUFFERED=0

# Command to run the application
CMD ["pphoto", "run"]
