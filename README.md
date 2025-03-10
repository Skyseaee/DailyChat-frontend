# install env
在 macOS 上安装 `nvm`（Node Version Manager）和 `npm`（Node Package Manager）的步骤如下：

### 1. 安装 Homebrew（如果尚未安装）
Homebrew 是 macOS 上的包管理器，可以简化安装过程。

打开终端并运行以下命令来安装 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. 安装 nvm
使用 Homebrew 安装 `nvm`：

```bash
brew install nvm
```

安装完成后，需要配置 `nvm`。将以下内容添加到你的 shell 配置文件（如 `~/.zshrc` 或 `~/.bashrc`）：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

然后，运行以下命令使配置生效：

```bash
source ~/.zshrc  # 或者 source ~/.bashrc
```

### 3. 使用 nvm 安装 Node.js 和 npm
安装最新版本的 Node.js（这将同时安装 `npm`）：

```bash
nvm install node
```

或者安装特定版本的 Node.js：

```bash
nvm install 14.17.0  # 例如安装 14.17.0 版本
```

### 4. 验证安装
安装完成后，验证 `node` 和 `npm` 是否安装成功：

```bash
node -v
npm -v
```

### 5. 切换 Node.js 版本（可选）
如果你安装了多个版本的 Node.js，可以使用以下命令切换版本：

```bash
nvm use 14.17.0  # 切换到 14.17.0 版本
```

或者设置为默认版本：

```bash
nvm alias default 14.17.0
```

### 6. 更新 npm（可选）
你可以使用以下命令更新 `npm` 到最新版本：

```bash
npm install -g npm@latest
```

### 总结
通过以上步骤，你已经在 macOS 上成功安装了 `nvm`、`Node.js` 和 `npm`。你可以使用 `nvm` 轻松管理多个 Node.js 版本，并使用 `npm` 安装和管理 Node.js 包。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
