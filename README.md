# 概要

LaTeXでレポートなどの図を伴う文書を作成する際に、各図のラベルがわからなくならないように管理するためのウェブアプリケーションです。
また、必要項目を埋めると、.ltxファイルで図を挿入するためのコードを出力します。

React.js、UIコンポーネントライブラリChakra-UIを使用しています。

https://haru960197.github.io/LatexFigureManager/

# 使い方

## 1 横並びにする画像の枚数を選択し、画像ファイルをアップロード

![upload](https://github.com/haru960197/LatexFigureManager/assets/124692504/3bb5e403-a1f5-4c70-953a-6142c0d42294)

画像ファイルは、ltxファイルと同じ階層にpicディレクトリを作成し、そこからアップロードすることが望ましいです。
（出力されるlatexコードではその前提で相対パスを指定するため。）

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



This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
