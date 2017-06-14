FROM anapsix/alpine-java:8_jdk_unlimited

MAINTAINER barlog@tanelorn.li

ARG JAVA_OPTS
ARG PORT

ADD app.jar /

EXPOSE $PORT

CMD java $JAVA_OPTS \
	-Djava.security.egd=file:/dev/./urandom \
	-jar /app.jar \
	--server.port=$PORT
