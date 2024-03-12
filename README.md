# Home Library Service

1. Downloading
```
git clone git@github.com:svetlana-tyshkevich/nodejs2024Q1-service.git
```
2. Switch to dev branch
```
git checkout hl-1
```
3. Installing NPM modules
```
npm install
```
4. Build app (it is necessary for correct dto schemas in swagger)
```
npm run build
```

5.Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.


6. Testing

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```