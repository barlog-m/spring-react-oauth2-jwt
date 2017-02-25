FROM anapsix/alpine-java:8_jdk_unlimited

ARG JAVA_OPTS
ARG PORT

ADD app.jar /

EXPOSE $PORT

CMD java $JAVA_OPTS \
	-Djava.security.egd=file:/dev/./urandom \
	-jar /app.jar
