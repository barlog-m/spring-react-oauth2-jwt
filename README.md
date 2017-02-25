## Web SPA Secured with OAuth2 and JWT

[Spring Boot](http://projects.spring.io/spring-boot/) + [React](https://facebook.github.io/react/)

* [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/)
* [RFC 6749](https://tools.ietf.org/html/rfc6749)
* [5 Easy Steps to Understanding JSON Web Tokens (JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.fgitv8lzd)
* An excellent tutorial which I found too late [Using JWT with Spring Security OAuth](http://www.baeldung.com/spring-security-oauth-jwt)

Default credentials: user/password

### Reqest token with user and password
```
http POST "http://localhost:8081/oauth/token?grant_type=password&client_id=test_tool&client_secret=06c8cab86d1fe668c4530a9fff15f7a6e35f1858&username=user&password=password"
```

### Use token
```
http --json http://localhost:8081/api/v1/foo "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsiYXBpIl0sIm5hbWUiOiLQn9C-0LvRjNC30L7QstCw0YLQtdC70YwiLCJleHAiOjE0ODgwODIxNzYsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiYTU0NWNlNjctN2YzNC00NTJiLWFiNzItMWExNmE1MmE1ZjZjIiwiY2xpZW50X2lkIjoidGVzdF90b29sIn0.G64ZXzgjA5vn7c_CrCqjdP4MM5Bknxp7vOJtKS7epl8"
```

### Reqest app auth
```
http://localhost:8081/oauth/authorize?response_type=token&client_id=test_tool
```

### Run without build jar (with reloadable resources)
```
gradle bootRun
```

### Run
```
gradle run
```

### Create executable jar with dependencies
```
gradle build
```
