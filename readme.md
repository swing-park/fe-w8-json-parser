# boilerplate-webpack

## Installation

1. Add this repository as a remote to your project, and check your remotes.

```
git remote add webpack https://github.com/adelakim5/bolierplate-webpack.git
```
```
git remote -v 
```

2. Pull the source code into your project.

```
git pull webpack master
```

3. Install all the packages written on `package.json`.

```
npm install
```

4. Test it.

- If you want to open your web-page quickly without any specific server, you can use `webpack-dev-server`.
- You can load your web-page by this command below.

```
npm run dev
```

- If you want to open your web-page with specific server(e.g. express), you can use `webpack-dev-middleware`.
- You can load your web-page by this command below.

```
npm start
```
