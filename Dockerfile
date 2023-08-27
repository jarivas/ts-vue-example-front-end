FROM node
COPY . /app
WORKDIR /app
RUN apt-get -y update
RUN apt-get -y install git
ENTRYPOINT ["tail", "-f", "/dev/null"]