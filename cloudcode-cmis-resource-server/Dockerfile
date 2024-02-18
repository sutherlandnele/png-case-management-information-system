FROM openjdk:8-jdk-alpine
EXPOSE 9084
MAINTAINER sutherland.nele@cloudcode.com.pg
ENV SITE_URL="127.0.0.1"

RUN apk add tzdata && cp /usr/share/zoneinfo/Pacific/Port_Moresby /etc/localtime && apk del tzdata

ADD ./cmis-restapi/target/cmis-restapi-1.0.0.jar cmis-restapi-1.0.0.jar
ADD ./cmis-restapi/config/application.properties /config/application.properties
ENTRYPOINT ["java","-jar", "cmis-restapi-1.0.0.jar"]