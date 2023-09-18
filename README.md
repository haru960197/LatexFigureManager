# 概要

LaTeXでレポートなどの図を伴う文書を作成する際に、各図のラベルがわからなくならないように管理するためのウェブアプリケーションです。
また、必要項目を埋めると、.ltxファイルで図を挿入するためのコードを出力します。

# 使い方

## 1 横並びにする画像の枚数を選択し、画像ファイルをアップロード

![upload](https://github.com/haru960197/LatexFigureManager/assets/124692504/3bb5e403-a1f5-4c70-953a-6142c0d42294)

## 2 それぞれキャプションとラベルを入力

![validation](https://github.com/haru960197/LatexFigureManager/assets/124692504/9ebd6dab-30e4-417c-a825-ce288aacfa75)

フォームにはバリデーション機能がついています。
必須項目を適切に（ラベルは半角文字）埋めることで「追加」ボタンが機能するようになります。

## 3 必要に応じて出力されるコードをコピー

![latex_Format_copy](https://github.com/haru960197/LatexFigureManager/assets/124692504/e7250784-f325-491c-b73d-06dbd45dda01)

フォームを埋め「追加」ボタンを押すとコードが出力されます。
右上の「COPY」ボタンを押すことでクリップボードにコピーされます。

## 4 ラベルやファイル名を確認

![figures](https://github.com/haru960197/LatexFigureManager/assets/124692504/189a918e-8d66-41b9-9998-4690d30cc316)

追加された画像はページ下部のリストで管理されます。

画像の上にカーソルを当てるとファイル名が表示されます。
また、ラベル部分をクリックすることでラベルがクリップボードにコピーされます。
右下のゴミ箱のアイコンをクリックすることでアイテムがリストから削除されます。

***

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
